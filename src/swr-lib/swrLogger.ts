import { BareFetcher, Middleware, SWRHook } from 'swr'

// https://swr.vercel.app/ja/docs/middleware
// https://swr.vercel.app/ja/docs/typescript#middleware-types

export const swrLogger: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {

  const extendedFetcher: BareFetcher<any> | null = (...args) => {
    console.log('SWR Request:', key)
    return fetcher?.(...args)
  }

  return useSWRNext(key, extendedFetcher, config)
}
