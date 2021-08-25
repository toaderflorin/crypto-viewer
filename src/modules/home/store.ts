import { Dispatch } from 'react'
import { AppState } from '../../app/store'
import { RequestState } from '../../app/types'
import * as api from './services/api'
import * as _ from 'lodash'

export const LOAD_CRYPTOS_REQUEST = 'LOAD_CRYPTOS_REQUEST'
export const LOAD_CRYPTOS_RECEIVED = 'LOAD_CRYPTOS_RECEIVED'
export const LOAD_CRYPTOS_ERROR = 'LOAD_CRYPTOS_ERROR'

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
}

export type HomeState = {
  cryptoCatalog: {
    data: CryptoInfo[]
    requestState: RequestState
  }
}

export type HomeAction =
  | { type: typeof LOAD_CRYPTOS_REQUEST }
  | { type: typeof LOAD_CRYPTOS_RECEIVED, cryptoCatalog: CryptoInfo[] }
  | { type: typeof LOAD_CRYPTOS_ERROR }

export const initialHomeState: HomeState = {
  cryptoCatalog: {
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

    default: {
      return state
    }
  }
}
