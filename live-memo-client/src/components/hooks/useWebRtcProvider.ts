import { useMemo } from 'react';
import { Doc } from 'yjs';
import { WebrtcProvider } from '../../app/y-webrtc';
import useYjsAwareness, { User } from './useYjsAwareness';
import { selectProvider, setRoomsStatus, selectRoomsStatus } from "../../features/memoSlice"
import { useSelector, useDispatch } from 'react-redux';


function useWebRtcProvider(user: User, documentId: string) {
	const ydoc = useMemo(() => new Doc({ guid: documentId }), [documentId]);
	const awareness = useYjsAwareness(user, ydoc);
	const curRoomsStatus = useSelector(selectRoomsStatus)
	// let curRoomCnt = curRoomsStatus.get(documentId) //현재 입력받은 룸안에 사람 수 체크
	const dispatch = useDispatch()
	return useMemo(() => {
		const roomName = `remirror-yjs-webrtc-demo-room-${documentId}`;
		// @ts-ignore opts param seems to expect ALL options
		const newProvider = new WebrtcProvider(user.picture, roomName, ydoc, {
			awareness,
			// signaling: ['wss://livememo.herokuapp.com']
		});
		dispatch(selectProvider({
			newProvider,
			documentId
		}))

		// if (curRoomCnt === undefined) {
		// 	dispatch(setRoomsStatus({
		// 		key: documentId,
		// 		value: 1
		// 	}))
		// }
		// else {
		// 	dispatch(setRoomsStatus({
		// 		key: documentId,
		// 		value: curRoomCnt + 1
		// 	}
		// 	))
		// }
		return newProvider
	}, [awareness, ydoc, documentId]);
}

export default useWebRtcProvider;
