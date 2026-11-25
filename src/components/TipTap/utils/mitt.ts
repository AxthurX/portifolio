export type EventType = string | symbol;

export type Handler<T = unknown> = (event: T) => void;
export type WildcardHandler<T = Record<string, unknown>> = (
	type: keyof T,
	event: T[keyof T],
) => void;

// An array of all currently registered event handlers for a type
export type EventHandlerList<T = unknown> = Array<Handler<T>>;
export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>;

// A map of event types and their corresponding event handlers.
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
	keyof Events | '*',
	EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>;

export interface Emitter<Events extends Record<EventType, unknown>> {
	all: EventHandlerMap<Events>;

	on: (<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) => void) &
		((type: '*', handler: WildcardHandler<Events>) => void);

	off: (<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>) => void) &
		((type: '*', handler: WildcardHandler<Events>) => void);

	emit: (<Key extends keyof Events>(type: Key, event: Events[Key]) => void) &
		(<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never) => void);
}

/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * @name mitt
 * @returns {Mitt}
 */
export default function mitt<Events extends Record<EventType, unknown>>(
	all?: EventHandlerMap<Events>,
): Emitter<Events> {
	type GenericEventHandler = Handler<Events[keyof Events]> | WildcardHandler<Events>;
	const event = all || new Map();

	return {
		event,

		/**
		 * Register an event handler for the given type.
		 * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
		 * @param {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		//@ts-expect-error
		on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
			const handlers: Array<GenericEventHandler> | undefined = event.get(type);
			if (handlers) {
				handlers.push(handler);
			} else {
				event.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
			}
		},

		/**
		 * Remove an event handler for the given type.
		 * If `handler` is omitted, all handlers of the given type are removed.
		 * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
		 * @param {Function} [handler] Handler function to remove
		 * @memberOf mitt
		 */
		//@ts-expect-error
		off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
			const handlers: Array<GenericEventHandler> | undefined = event.get(type);
			if (handlers) {
				if (handler) {
					handlers.splice(handlers.indexOf(handler) >>> 0, 1);
				} else {
					event.set(type, []);
				}
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `'*'` handlers are invoked after type-matched handlers.
		 *
		 * Note: Manually firing '*' handlers is not supported.
		 *
		 * @param {string|symbol} type The event type to invoke
		 * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
			let handlers = event.get(type);
			if (handlers) {
				[...(handlers as EventHandlerList<Events[keyof Events]>)].forEach((handler) => {
					handler(evt as Events[keyof Events]);
				});
			}

			handlers = event.get('*');
			if (handlers) {
				[...(handlers as WildCardEventHandlerList<Events>)].forEach((handler) => {
					handler(type, evt as Events[keyof Events]);
				});
			}
		},
	};
}
