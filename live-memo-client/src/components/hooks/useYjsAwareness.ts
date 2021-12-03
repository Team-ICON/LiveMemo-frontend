import { useMemo } from 'react';
import { Doc } from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness.js';
import getRandomColor from '../utils/getRandomColor';

export interface User {
	displayName: string;
	[x: string]: any;
}

function useYjsAwareness(user: User, doc: Doc): awarenessProtocol.Awareness {
	return useMemo(() => {
		const awareness = new awarenessProtocol.Awareness(doc);
		awareness.setLocalStateField('user', {
			name: user.displayName,
			color: user.color === "" ? getRandomColor(user.name) : user.color,
		});
		return awareness;
	}, [user.displayName, doc]);
}

export default useYjsAwareness;
