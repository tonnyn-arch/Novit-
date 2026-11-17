/**
 * Adaptador de persistência seguro.
 * localStorage pode lançar exceções (modo privado, quota, bloqueio),
 * por isso todas as operações falham em silêncio e devolvem o fallback.
 */
export function createStorage(namespace, backend = globalThis.localStorage) {
  const key = (k) => `${namespace}:${k}`;

  return {
    get(k, fallback = null) {
      try {
        const raw = backend?.getItem(key(k));
        return raw == null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(k, value) {
      try {
        backend?.setItem(key(k), JSON.stringify(value));
      } catch {
        /* sem persistência — a app continua a funcionar em memória */
      }
    },
  };
}
