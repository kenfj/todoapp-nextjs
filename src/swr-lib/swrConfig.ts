import { SWRConfiguration } from 'swr'
import { swrLogger } from './swrLogger'
import { swrErrorHandler } from './swrErrorHandler'

export const swrConfigValue: SWRConfiguration = {
  use: [
    swrLogger
  ],
  onError: swrErrorHandler,
}
