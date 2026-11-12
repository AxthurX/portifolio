'use client';

import { createContext, type ReactNode, useCallback, useContext, useState } from 'react';
import { handleSettings } from '../util';
import type { Key } from './items';

const DEFAULT_SETTINGS: Record<string, string> = {
	alignment: 'none',
	saturation: '100%',
	text: '16',
	contrast: 'sedam',
	spacing: 'normal',
	font: "'AmsiPro', sans-serif",
	cursor: 'cursor',
	height: 'normal',
	'pause-animation': 'disable',
	'link-highlight': 'disable',
	'title-highlight': 'disable',
	'hidden-images': 'disable',
	'reading-mode': 'disable',
	'enlarge-cursor': 'disable',
	'voice-command': 'disable',
	'site-map': 'enable',
	'page-structure': 'disable',
	vlibras: 'enable',
	position: 'right',
};

interface AccessibilityProfile {
	key: string;
	settings: Record<string, string>;
}

interface AccessibilityContextType {
	profile: string | null;
	isMenuOpen: boolean;
	settings: Record<string, string>;

	updateSetting: (key: Key, value: string) => void;
	resetSettings: () => void;
	applyProfile: (profileKey: string, accessibility_profile: AccessibilityProfile[]) => void;
	toggleMenu: (status?: boolean) => void;
	setVoiceCommandStatus: (status: boolean) => void;
	voiceResetSettings: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

function applySettings(settings: Record<string, string>) {
	for (const key in settings) {
		key !== 'vlibras' && key !== 'site-map' && handleSettings(key as Key, settings[key]);
	}
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
	const [settings, setSettings] = useState(DEFAULT_SETTINGS);
	const [profile, setProfile] = useState<string | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = useCallback((status?: boolean) => {
		setIsMenuOpen((prev) => status ?? !prev);
	}, []);

	const updateSetting = useCallback(
		(key: Key, value: string) => {
			const action_keys: Key[] = ['site-map', 'vlibras'];

			setSettings((prev) => {
				if (!action_keys.includes(key) && prev[key] === value) return prev;

				const next = action_keys.includes(key) ? prev : { ...prev, [key]: value };

				handleSettings(key, value, { toggleMenu });
				return next;
			});
		},
		[toggleMenu],
	);

	const resetSettings = useCallback(() => {
		setProfile(null);
		setSettings(DEFAULT_SETTINGS);
		applySettings(DEFAULT_SETTINGS);
	}, []);

	const setVoiceCommandStatus = useCallback(
		(status: boolean) => {
			updateSetting('voice-command', status ? 'enable' : 'disable');
		},
		[updateSetting],
	);

	const voiceResetSettings = useCallback(() => {
		setSettings((prev) => {
			const next = {
				...DEFAULT_SETTINGS,
				'voice-command': prev['voice-command'],
			};

			applySettings(next);
			return next;
		});
	}, []);

	const applyProfile = useCallback((key: string, profiles: AccessibilityProfile[]) => {
		setProfile((current) => {
			if (current === key) {
				setSettings(DEFAULT_SETTINGS);
				applySettings(DEFAULT_SETTINGS);
				return null;
			}

			const selected = profiles.find((p) => p.key === key);
			if (!selected) return current;

			const next = {
				...DEFAULT_SETTINGS,
				...selected.settings,
			};

			setSettings(next);
			applySettings(next);

			return key;
		});
	}, []);

	return (
		<AccessibilityContext.Provider
			value={{
				settings,
				isMenuOpen,
				toggleMenu,
				setVoiceCommandStatus,
				profile,
				updateSetting,
				resetSettings,
				voiceResetSettings,
				applyProfile,
			}}
		>
			{children}
		</AccessibilityContext.Provider>
	);
}

export const useAccessibility = () => {
	const ctx = useContext(AccessibilityContext);
	if (!ctx) {
		throw new Error('useAccessibility deve ser usado dentro de um AccessibilityProvider');
	}
	return ctx;
};
