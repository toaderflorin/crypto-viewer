import { Dispatch } from 'react'
import { AppState } from '../../app/store'
import { ApiResponse, RequestState, Value } from '../../app/types'
import * as api from './services/api'
import * as _ from 'lodash'

export const LOAD_CRYPTOS_REQUEST = 'LOAD_CRYPTOS_REQUEST'
export const LOAD_CRYPTOS_RECEIVED = 'LOAD_CRYPTOS_RECEIVED'
export const LOAD_CRYPTOS_ERROR = 'LOAD_CRYPTOS_ERROR'
export const LOAD_CRYPTO_DETAILS_REQUEST = 'LOAD_CRYPTO_DETAILS_REQUEST'
export const LOAD_CRYPTO_DETAILS_RECEIVED = 'LOAD_CRYPTO_DETAILS_RECEIVED'
export const LOAD_CRYPTO_DETAILS_ERROR = 'LOAD_CRYPTO_DETAILS_ERROR'

export type CryptoInfo = {
  id: string
  name: string
}

export type Candle = {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  date: Date
}

export type HomeState = {
  cryptoCatalog: {
    data: CryptoInfo[]
    requestState: RequestState
  },
  details: {
    data: Candle[],
    requestState: RequestState
  }
}

export type HomeAction =
  | { type: typeof LOAD_CRYPTOS_REQUEST }
  | { type: typeof LOAD_CRYPTOS_RECEIVED, cryptoCatalog: CryptoInfo[] }
  | { type: typeof LOAD_CRYPTOS_ERROR }
  | { type: typeof LOAD_CRYPTO_DETAILS_REQUEST }
  | { type: typeof LOAD_CRYPTO_DETAILS_RECEIVED, details: ApiResponse }
  | { type: typeof LOAD_CRYPTO_DETAILS_ERROR }

export const initialHomeState: HomeState = {
  cryptoCatalog: {
    data: [],
    requestState: RequestState.Null
  },
  details: {
    data: [],
    requestState: RequestState.Null
  }
}

export function loadCryptos() {
  return async function (_state: AppState, dispatch: Dispatch<HomeAction>) {
    try {
      dispatch({
        type: LOAD_CRYPTOS_REQUEST
      })

      const result = await api.loadCryptos()

      function mapCrypto(pair: any): CryptoInfo {
        return {
          id: result[pair.pair].id,
          name: pair.name
        }
      }

      const pairs = [
        {
          pair: 'USDT_BTC',
          name: 'Bitcoin/USD'
        },
        {
          pair: 'USDT_ETH',
          name: 'Ethereum/USD'
        }, 
        { 
          pair: 'USDT_LINK', 
          name: 'Link'
        }
      ]

      const details = pairs.map(pair => mapCrypto(pair))
      console.log('details', details)

      dispatch({
        type: LOAD_CRYPTOS_RECEIVED,
        cryptoCatalog: details
      })
    } catch {
      dispatch({
        type: LOAD_CRYPTOS_ERROR
      })
    }
  }
}

export function loadCryptoChart(cryptoId: string) {
  return async function (_state: AppState, dispatch: Dispatch<HomeAction>) {
    // try {
    //   dispatch({
    //     type: LOAD_CRYPTO_DETAILS_REQUEST
    //   })

    //   const result = await api.loadCryptoChart(cryptoId)




    //   dispatch({
    //     type: LOAD_CRYPTO_DETAILS_RECEIVED,
    //     details
    //   })
    // } catch {
    //   dispatch({
    //     type: LOAD_CRYPTO_DETAILS_ERROR
    //   })
    // }
  }
}

export function homeReducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case LOAD_CRYPTOS_REQUEST: {
      return {
        ...state,
        cryptoCatalog: {
          ...state.cryptoCatalog,
          requestState: RequestState.Loading
        }
      }
    }

    case LOAD_CRYPTOS_RECEIVED: {
      return {
        ...state,
        cryptoCatalog: {
          ...state.cryptoCatalog,
          data: action.cryptoCatalog,
          requestState: RequestState.Loaded
        }
      }
    }

    case LOAD_CRYPTOS_ERROR: {
      return {
        ...state,
        cryptoCatalog: {
          ...state.cryptoCatalog,
          requestState: RequestState.Error
        }
      }
    }

    case LOAD_CRYPTO_DETAILS_REQUEST: {
      return {
        ...state,
        details: {
          ...state.details,
          requestState: RequestState.Loading
        }
      }
    }

    case LOAD_CRYPTO_DETAILS_RECEIVED: {
      return {
        ...state,
        details: {
          ...state.details,
          data: action.details,
          requestState: RequestState.Loaded
        }
      }
    }

    case LOAD_CRYPTO_DETAILS_ERROR: {
      return {
        ...state,
        details: {
          ...state.details,
          requestState: RequestState.Error
        }
      }
    }

    default: {
      return state
    }
  }
}

function mapCrypto(data: ApiResponse): CryptoInfo {
  return {
    id: data.id,
    name: data.name
  }
}

function mapCandle(data: any): Candle {
  return {
    timestamp: data[0] as number,
    open: data[1] as number,
    high: data[2] as number,
    low: data[3] as number,
    close: data[4] as number,
    date: new Date(data[0])
  }
}
