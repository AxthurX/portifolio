import type { Editor } from '@tiptap/core';
import { useCallback, useEffect, useState } from 'react';

export type ElementDimensions = { width: number; height: number };
export type ResizeDirection = 'tl' | 'tr' | 'bl' | 'br';

type HookParams = {
	editor: Editor;
	initialWidth: number;
	initialHeight: number;
	imageFloat?: 'left' | 'right' | 'none';
	onDimensionsChange: (dimensions: ElementDimensions) => void;
};

export function useDragResize({
	editor,
	initialWidth,
	initialHeight,
	onDimensionsChange,
	imageFloat = 'none',
}: HookParams) {
	const grid_interval = 0.1;
	const [maxWidth, setMaxWidth] = useState<number>(0);
	const [boundaryWidth, setBoundaryWidth] = useState(Number.POSITIVE_INFINITY);
	const [resizeOrigin, setResizeOrigin] = useState(0);
	const [resizeDirection, setResizeDirection] = useState<ResizeDirection>();
	const [dimensions, updateDimensions] = useState<ElementDimensions>({
		width: initialWidth,
		height: initialHeight,
	});
	const [initialDimensions, setInitialDimensions] = useState<ElementDimensions>(dimensions);

	useEffect(() => {
		updateDimensions({
			width: initialWidth,
			height: initialHeight,
		});
		setInitialDimensions({
			width: initialWidth,
			height: initialHeight,
		});
	}, [initialWidth, initialHeight]);

	useEffect(() => {
		setMaxWidth(editor.view.dom.getBoundingClientRect().width - 120);
	}, [editor.view]);

	const constrainedWidth = useCallback(
		(proposedWidth: number) => {
			const effective_min_width = Math.max(100, Math.min((grid_interval / 100) * maxWidth));

			return Math.min(maxWidth, Math.max(proposedWidth, effective_min_width));
		},
		[maxWidth],
	);

	const handlePointerMove = useCallback(
		(event: PointerEvent) => {
			if (!resizeDirection && !initialDimensions) return;
			event.preventDefault();

			const is_left_handle = resizeDirection === 'tl' || resizeDirection === 'bl';

			const delta_x = event.pageX - resizeOrigin;

			let movement_delta = is_left_handle ? -delta_x : delta_x;

			const multiplier = imageFloat === 'none' ? 2 : 1;

			movement_delta = movement_delta * multiplier;

			const grid_unit_width = (grid_interval / 100) * boundaryWidth;
			const proposed_width = initialDimensions.width + movement_delta;
			const aligned_width = Math.round(proposed_width / grid_unit_width) * grid_unit_width;

			const final_width = constrainedWidth(aligned_width);

			const aspect_radio = initialDimensions.width / (initialDimensions.height || 1);

			updateDimensions({
				width: final_width,
				height: Math.round(final_width / aspect_radio),
			});
		},
		[resizeDirection, resizeOrigin, boundaryWidth, initialDimensions, constrainedWidth, imageFloat],
	);

	const handlePointerUp = useCallback(() => {
		if (!dimensions) return;

		setResizeOrigin(0);
		setResizeDirection(undefined);
		onDimensionsChange(dimensions);
	}, [onDimensionsChange, dimensions]);

	const handleKeydown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape' && initialDimensions) {
				updateDimensions(initialDimensions);
				setResizeDirection(undefined);
			}
		},
		[initialDimensions],
	);

	const initiateResize = useCallback(
		(event: React.PointerEvent<HTMLDivElement>) => {
			event.preventDefault();

			const direction = event.currentTarget.dataset.direction as ResizeDirection;

			if (!direction) return;

			setBoundaryWidth(maxWidth);

			const safeWidth = constrainedWidth(initialWidth);
			const safeHeight = initialHeight > 0 ? initialHeight : dimensions.height;

			setInitialDimensions({
				width: safeWidth,
				height: safeHeight,
			});

			setResizeOrigin(event.pageX);
			setResizeDirection(direction);
		},
		[maxWidth, initialWidth, initialHeight, constrainedWidth, dimensions],
	);

	useEffect(() => {
		if (resizeDirection && typeof document !== 'undefined') {
			document.addEventListener('keydown', handleKeydown);
			document.addEventListener('pointermove', handlePointerMove);
			document.addEventListener('pointerup', handlePointerUp);

			return () => {
				document.removeEventListener('keydown', handleKeydown);
				document.removeEventListener('pointermove', handlePointerMove);
				document.removeEventListener('pointerup', handlePointerUp);
			};
		}
	}, [resizeDirection, handleKeydown, handlePointerMove, handlePointerUp]);

	return {
		initiateResize,
		isResizing: !!resizeDirection,
		currentWidth: dimensions.width ?? initialWidth,
		currentHeight: dimensions.height ?? initialHeight,
	};
}
