import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface ISpeechErrorEvent extends Event {
	error:
		| 'no-speech'
		| 'aborted'
		| 'audio-capture'
		| 'network'
		| 'not-allowed'
		| 'service-not-allowed'
		| 'bad-grammar'
		| 'language-not-supported';
	message: string;
}
interface ISpeechResultEvent extends Event {
	resultIndex: number;
	results: SpeechRecognitionResultList;
}
interface SpeechRecognitionInstance {
	lang: string;
	continuous: boolean;
	interimResults: boolean;
	start(): void;
	stop(): void;
	onspeechstart: ((event: Event) => void) | null;
	onresult: ((event: ISpeechResultEvent) => void) | null;
	onerror: ((event: ISpeechErrorEvent) => void) | null;
	onend: ((event: Event) => void) | null;
}

export function useWebSpeech(enabled: boolean, onFinalResult: (text: string) => void) {
	const [transcript, setTranscript] = useState('');
	const [isListening, setIsListening] = useState(false);
	const [feedback, setFeedback] = useState<string | null>(null);

	const recognition_ref = useRef<SpeechRecognitionInstance | null>(null);
	const enabled_ref = useRef(enabled);

	const on_final_result_ref = useRef(onFinalResult);

	useLayoutEffect(() => {
		on_final_result_ref.current = onFinalResult;
		enabled_ref.current = enabled;
	}, [enabled, onFinalResult]);

	useEffect(() => {
		if (!enabled) {
			if (recognition_ref.current) recognition_ref.current.stop();
			return;
		}

		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			console.error('Reconhecimento de voz não suportado neste navegador.');
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.continuous = false;
		recognition.interimResults = false;
		recognition.lang = 'pt-BR';

		recognition.onspeechstart = () => {
			setIsListening(true);
		};

		recognition.onresult = (event: ISpeechResultEvent) => {
			let interim_transcript = '';
			for (let i = event.resultIndex; i < event.results.length; ++i) {
				const result = event.results[i];
				const text = result[0].transcript;

				if (result.isFinal) {
					setIsListening(false);
					setTranscript(text);
					on_final_result_ref.current(text);
					setTimeout(() => setTranscript(''), 1500);
				} else {
					interim_transcript = text;
					setTranscript(interim_transcript);
				}
			}
		};

		recognition.onend = () => {
			if (enabled_ref.current) {
				try {
					recognition.start();
				} catch (e) {
					console.error('Erro ao reiniciar o reconhecimento de voz:', e);
				}
			}
		};

		recognition.onerror = (event: ISpeechErrorEvent) => {
			if (event.error !== 'no-speech') {
				console.error('Erro no reconhecimento:', event.error);
			}

			if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
				setIsListening(false);
				enabled_ref.current = false;
				setFeedback('Permissão de microfone negada.');
			}
		};

		recognition.start();
		recognition_ref.current = recognition;

		return () => {
			enabled_ref.current = false;
			recognition.stop();
			recognition_ref.current = null;
		};
	}, [enabled]);

	return {
		transcript,
		setTranscript,
		feedback,
		setFeedback,
		isListening,
	};
}
