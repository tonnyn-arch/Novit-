/** Pub/sub mínimo para desacoplar estado (stores) de vistas (views). */
export function createEmitter() {
  const listeners = new Set();
  return {
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    emit(payload) {
      listeners.forEach((fn) => fn(payload));
    },
  };
}
