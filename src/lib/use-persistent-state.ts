'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_PREFIX = 'homehub:';

function readStored<T>(key: string): T | undefined {
	if (typeof window === 'undefined') return undefined;

	try {
		const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
		return raw === null ? undefined : (JSON.parse(raw) as T);
	} catch {
		return undefined;
	}
}

function writeStored<T>(key: string, value: T) {
	if (typeof window === 'undefined') return;

	try {
		window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
	} catch {
		// quota cheia ou storage bloqueado: o estado continua em memória
	}
}

export function usePersistentState<T>(key: string, initialValue: T) {
	const initialRef = useRef(initialValue);

	const [state, setState] = useState<T>(initialRef.current);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		const stored = readStored<T>(key);

		if (stored !== undefined) setState(stored);

		setHydrated(true);
	}, [key]);

	useEffect(() => {
		if (hydrated) writeStored(key, state);
	}, [key, state, hydrated]);

	const reset = useCallback(() => {
		setState(initialRef.current);
		writeStored(key, initialRef.current);
	}, [key]);

	return [state, setState, { hydrated, reset }] as const;
}
