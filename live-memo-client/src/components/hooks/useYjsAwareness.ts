import { useMemo } from 'react';
import { Doc } from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness.js';
import getRandomColor from '../utils/getRandomColor';
import { useColor } from 'color-thief-react'

export interface User {
	displayName: string;
	[x: string]: any;
}

function useYjsAwareness(user: User, doc: Doc): awarenessProtocol.Awareness {
	const { data, loading, error } = useColor(user.picture, "hex", { crossOrigin: "anonymous" })
	return useMemo(() => {
		const awareness = new awarenessProtocol.Awareness(doc);
		awareness.setLocalStateField('user', {
			name: user.displayName,
			color: data
		});
		return awareness;
	}, [user.displayName, doc]);
}

export default useYjsAwareness;
