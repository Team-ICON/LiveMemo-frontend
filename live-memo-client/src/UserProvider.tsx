import { createContext } from 'react';

export interface User {
	displayName: string;
	email: string;
	photoUrl: string;

}

export default createContext<User>({

	displayName: 'unknown',
	email: 'Unknown User',
	photoUrl: "Unkown"
});
