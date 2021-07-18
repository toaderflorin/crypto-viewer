import { Dispatch } from 'react'
import { AppState } from '../../app/store'
import { ApiResponse, RequestState, Value } from '../../app/types'
import * as api from './services/api'

export const LOAD_CRYPTOS_REQUEST = 'LOAD_CRYPTOS_REQUEST'
export const LOAD_CRYPTOS_RECEIVED = 'LOAD_CRYPTOS_RECEIVED'
export const LOAD_CRYPTOS_ERROR = 'LOAD_CRYPTOS_ERROR'

export type CryptoInfo = {
  id: string
  name: string
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
