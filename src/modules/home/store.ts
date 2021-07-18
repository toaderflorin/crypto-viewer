import { Dispatch } from 'react'
import { AppState } from '../../app/store'
import { Value } from '../../app/types'
import * as api from './services/api'

export const LOAD_CRYPTOS_REQUEST = 'LOAD_CRYPTOS_REQUEST'
export const LOAD_CRYPTOS_RECEIVED = 'LOAD_CRYPTOS_RECEIVED'
export const LOAD_CRYPTOS_ERROR = 'LOAD_CRYPTOS_ERROR'

export type CryptoInfo = {
  id: string,
  name: string
}

export type HomeState = {
  cryptoCatalog: Value[]
}

export type HomeAction = 
| { type: typeof LOAD_CRYPTOS_REQUEST }
| { type: typeof LOAD_CRYPTOS_RECEIVED, cryptoCatalog: CryptoInfo[] }
| { type: typeof LOAD_CRYPTOS_ERROR }

export const initialHomeState = {
  cryptoCatalog: []
}

export function loadCryptos() {
  return async function (state: AppState, dispatch: Dispatch<HomeAction>) {
    try {
      dispatch({
        type: LOAD_CRYPTOS_REQUEST
      })

      const catalog = await api.loadCryptos()

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

export function homeReducer(state: HomeState, action: HomeAction) {
  switch (action.type) {
    case LOAD_CRYPTOS_REQUEST: {
      return {
        ...state
      }
    }

    case LOAD_CRYPTOS_RECEIVED: {
      return {
        ...state,
        cryptoCatalog: action.cryptoCatalog
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
