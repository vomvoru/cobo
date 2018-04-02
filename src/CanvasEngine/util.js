import _ from 'lodash'

export const gcd = (a, b) => (!b ? a : gcd(b, a % b))
export const lcm = (a, b) => (a * b) / gcd(a, b)
export const useCache = (fn) => {
  let useCacheFn = _.memoize(fn)
  const result = (...args) => useCacheFn(...args)
  result.clearCache = () => {
    useCacheFn = _.memoize(fn)
  }

  return result
}
