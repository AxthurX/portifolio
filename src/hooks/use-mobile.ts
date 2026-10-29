import * as React from 'react';
import type { LayoutMode } from '@/lib/board-state';

const MOBILE_BREAKPOINT = 768;
const COMPACT_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener('change', onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener('change', onChange);
	}, []);

	return !!isMobile;
}

const subscribeLayout = (onChange: () => void) => {
	const mql = window.matchMedia(COMPACT_QUERY);
	mql.addEventListener('change', onChange);
	return () => mql.removeEventListener('change', onChange);
};

const getLayoutSnapshot = (): LayoutMode =>
	window.matchMedia(COMPACT_QUERY).matches ? 'compact' : 'wide';

const getServerLayoutSnapshot = (): LayoutMode => 'wide';

export function useLayoutMode(): LayoutMode {
	return React.useSyncExternalStore(subscribeLayout, getLayoutSnapshot, getServerLayoutSnapshot);
}
