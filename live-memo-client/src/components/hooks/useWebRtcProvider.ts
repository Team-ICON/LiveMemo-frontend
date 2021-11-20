import { useMemo } from 'react';
import { Doc } from 'yjs';
import { WebrtcProvider } from '../../app/y-webrtc';
import useYjsAwareness, { User } from './useYjsAwareness';
import { useDispatch } from 'react-redux';
import { selectProvider } from "../../features/memoSlice"

function useWebRtcProvider(user: User, documentId: string) {
	const ydoc = useMemo(() => new Doc({ guid: documentId }), [documentId]);
	const awareness = useYjsAwareness(user, ydoc);
	const dispatch = useDispatch()
	return useMemo(() => {
		const roomName = `remirror-yjs-webrtc-demo-room-${documentId}`;
		// @ts-ignore opts param seems to expect ALL options
		const newProvider = new WebrtcProvider(user.email, roomName, ydoc, {
			awareness,
			signaling: ['wss://livememo.herokuapp.com']
		});
		dispatch(selectProvider({
			newProvider,
			documentId
		}))
		return newProvider
	}, [awareness, ydoc, documentId]);
}

export default useWebRtcProvider;
