/**
 * Checks `window` object absence
 *
 * @return {Boolean} true if current runtime is server based, otherwise false
 */
export function isSSR(): boolean {
  return typeof window === 'undefined'
}

/**
 * Checks `window` object existence
 *
 * @return {Boolean} true if current runtime is client based, otherwise false
 */
export function isCSR(): boolean {
  return !isSSR()
}
