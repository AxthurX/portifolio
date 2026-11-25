'use client';

import { useCallback, useSyncExternalStore } from 'react';

const uploaded: File[] = [];
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
}

function getSnapshot() {
	return uploaded;
}

/** Local stand-in for the portal post context: keeps uploads in memory. */
export function usePostContext() {
	const files = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

	const addFile = useCallback((file: File) => {
		uploaded.push(file);
		for (const listener of listeners) listener();
	}, []);

	return { files, addFile };
}
