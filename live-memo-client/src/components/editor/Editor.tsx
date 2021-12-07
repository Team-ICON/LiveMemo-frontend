import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import { RemirrorJSON, } from 'remirror';
import { YjsExtension, AnnotationExtension, BoldExtension, ImageExtension, TextHighlightExtension } from 'remirror/extensions';
import {
    EditorComponent,
    Remirror,
    ThemeProvider,
    useRemirror,

} from '@remirror/react';
import { setCurUserList, } from '../../features/userSlice';
import ExtensionButtons from "../CreateMemo/ExtensionButtons"

import { useDebouncedCallback } from 'use-debounce';
import useCurrentUser from '../hooks/useCurrentUser';
import useWebRtcProvider from '../hooks/useWebRtcProvider';
import useSaveHook from '../hooks/useSaveHook';

import useObservableListener from '../hooks/useObservableListener';
import FloatingAnnotations from './FloatingAnnotations';
import AnnotationsJSONPrinter from './AnnotationsJSONPrinter';
import 'remirror/styles/all.css';
import "./Editor.css"
import { useDispatch, useSelector } from 'react-redux';
import { selectDoc } from '../../features/memoSlice';
interface EditorProps {
    documentId: string;
    onFetch: Function;
    onSave: Function;
}

const TIMEOUT = 3000 + Math.floor(Math.random() * 7000);
const firstState = "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\"}]}"

console.log(TIMEOUT)
const Status = ({ success = false }) => (
    <span className={`status ${success ? 'success' : ''}`}>&nbsp;</span>
);

function Editor({ documentId, onFetch, onSave, }: EditorProps) {
    const usedFallbackRef = useRef<boolean>(false);
    const currentUser = useCurrentUser();

    const provider = useWebRtcProvider(currentUser, documentId);
    const [clientCount, setClientCount] = useState<number>(0);
    const [isSynced, setIsSynced] = useState<boolean>(false);
    const [docState, setDocState] = useState<RemirrorJSON>();
    const dispatch = useDispatch()


    const handleChange = useCallback(
        ({ state, tr, content }) => {
            //state 는 현재 editstate 뜸 tr은  트랜잭션 tr은 editstate 안에도 있음 
            if (tr?.docChanged) {
                setDocState(state.toJSON().doc);

            }
        },
        [setDocState],
    );



    useEffect(() => {
        dispatch(selectDoc({
            docState
        }))

        // console.log(typeof (docState));
    }, [docState])

    const handleSave = useCallback(
        newDocState => {
            if (isSynced || clientCount === 0) {
                onSave(documentId, JSON.stringify(newDocState), false);
                const meta = provider.doc.getMap('meta');
                meta.set('lastSaved', Date.now());
                console.log(meta)
            }
        },
        [onSave, documentId, provider.doc, isSynced, clientCount],
    );


    const handleSaveDebounced = useDebouncedCallback(handleSave, TIMEOUT);




    const handlePeersChange = useCallback(
        ({ webrtcPeers }) => {
            // console.log("사람수:", webrtcPeers.length)
            setClientCount(webrtcPeers.length);
            console.log(clientCount)
            dispatch(setCurUserList({
                webrtcPeers
            }))

        },
        [setClientCount, provider.room?.webrtcConns],
    );
    useObservableListener('peers', handlePeersChange, provider);


    const handleSynced = useCallback(
        ({ synced }) => {
            setIsSynced(synced);
        },
        [setIsSynced],
    );

    useObservableListener('synced', handleSynced, provider);

    useEffect(() => {
        handleSaveDebounced(docState);
    }, [handleSaveDebounced, docState]);

    const handleYDocUpdate = useCallback(() => {
        handleSaveDebounced.cancel();
    }, [handleSaveDebounced]);

    useObservableListener('update', handleYDocUpdate, provider.doc);


    // const linkExtension = useMemo(() => {
    //     const extension = new LinkExtension({ autoLink: true });
    //     extension.addHandler('onClick', (_, data) => {
    //         window.location.href = data.href
    //         return true;
    //     });
    //     return extension;
    // }, []);


    const createExtensions = useCallback(() => {
        return [
            new BoldExtension(),
            new YjsExtension({
                getProvider: () => provider,
            }),
            new AnnotationExtension(),
            new ImageExtension({ enableResizing: true }),
            new TextHighlightExtension(),
        ];
    }, [provider]);


    //getcontext 는 햔재 remirror 상태 다 들어 있음
    const { manager, state, getContext } = useRemirror({
        extensions: createExtensions,
    });

    useEffect(() => {

        if (usedFallbackRef.current) {
            return;
        }
        const fetchFallback = async () => {

            console.log(clientCount)
            if (provider.connected && clientCount === 0) {
                const res = await onFetch(documentId);
                // res는 문자열이여서 여기서 JSON형태로 넘겨줘야됨 위에서 JSON으로 받아서 통일시킴 그래서 나중에 create에서 stringify 함
                dispatch(selectDoc({
                    docState: JSON.parse(res)
                }))
                console.log(docState)
                getContext()?.setContent(JSON.parse(res));


            }


            usedFallbackRef.current = true;
        };


        const timeoutId = window.setTimeout(fetchFallback, 500);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [onFetch, documentId, provider.connected, clientCount, getContext]);

    return (
        <ThemeProvider>
            <Remirror manager={manager} onChange={handleChange} >
                <EditorComponent />
                <ExtensionButtons />

            </Remirror>

        </ThemeProvider>
    );
}

export default Editor;
