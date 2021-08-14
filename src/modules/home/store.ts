import { Dispatch } from 'react'
import { AppState } from '../../app/store'
import { ApiResponse, RequestState, Value } from '../../app/types'
import * as api from './services/api'

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

export type HomeState = {
  cryptoCatalog: {
    data: CryptoInfo[]
    requestState: RequestState
    details: any
  }
}

export type HomeAction =
  | { type: typeof LOAD_CRYPTOS_REQUEST }
  | { type: typeof LOAD_CRYPTOS_RECEIVED, cryptoCatalog: CryptoInfo[] }
  | { type: typeof LOAD_CRYPTOS_ERROR }
  | { type: typeof LOAD_CRYPTO_DETAILS_REQUEST }
  | { type: typeof LOAD_CRYPTO_DETAILS_RECEIVED, details: any }
  | { type: typeof LOAD_CRYPTO_DETAILS_ERROR }

export const initialHomeState: HomeState = {
  cryptoCatalog: {
    data: [],
    requestState: RequestState.Null,
    details: [] as any
  }
}

export function loadCryptos() {
  return async function (state: AppState, dispatch: Dispatch<HomeAction>) {
    try {
      dispatch({
        type: LOAD_CRYPTOS_REQUEST
      })

      const response = await api.loadCryptos()
      const catalog = response.map(data => mapCrypto(data)) as CryptoInfo[]

      dispatch({
        type: LOAD_CRYPTOS_RECEIVED,
        cryptoCatalog: catalog
      })
    } catch {
      dispatch({
        type: LOAD_CRYPTOS_ERROR
      })
    }
  }
}

export function loadCryptoChart(cryptoId: string) {
  return async function (state: AppState, dispatch: Dispatch<HomeAction>) {
    try {
      dispatch({
        type: LOAD_CRYPTO_DETAILS_REQUEST
      })

      const x = await api.loadCryptoChart(cryptoId)

      dispatch({
        type: LOAD_CRYPTO_DETAILS_RECEIVED,
        cryptoDetails: x
      })
    } catch {
      dispatch({
        type: LOAD_CRYPTO_DETAILS_ERROR
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
      console.log('crypto catalog', action.cryptoCatalog)
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
        ...state
      }
    }

    case LOAD_CRYPTO_DETAILS_REQUEST: {
      return {
        ...state
      }
    }

    case LOAD_CRYPTO_DETAILS_RECEIVED: {
      return {
        ...state,
        details: action.details
      }
    }

    case LOAD_CRYPTO_DETAILS_ERROR: {
      return {
        ...state
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
