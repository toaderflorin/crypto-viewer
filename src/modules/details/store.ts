import { Dispatch } from "react"
import { AppState } from "../../app/store"
import { ApiResponse, RequestState } from "../../app/types"
import * as api from './services/api'

export const LOAD_CRYPTO_DETAILS_REQUEST = 'LOAD_CRYPTO_DETAILS_REQUEST'
export const LOAD_CRYPTO_DETAILS_RECEIVED = 'LOAD_CRYPTO_DETAILS_RECEIVED'
export const LOAD_CRYPTO_DETAILS_ERROR = 'LOAD_CRYPTO_DETAILS_ERROR'

export type DetailsAction =
  | { type: typeof LOAD_CRYPTO_DETAILS_REQUEST }
  | { type: typeof LOAD_CRYPTO_DETAILS_RECEIVED, details: ApiResponse }
  | { type: typeof LOAD_CRYPTO_DETAILS_ERROR }

export type Candle = {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
}

export type DetailsState = {
  details: {
    data: Candle[],
    requestState: RequestState
  }
}

export const initialDetailsState: DetailsState = { 
  details: {
    data: [],
    requestState: RequestState.Null
  }
}

export function loadCryptoChart(cryptoId: string) {
  return async function (_state: AppState, dispatch: Dispatch<DetailsAction>) {
    try {
      dispatch({
        type: LOAD_CRYPTO_DETAILS_REQUEST
      })

      const result = await api.loadCryptoChart(cryptoId)
      const details = result.map(data => mapCandle(data))

      dispatch({
        type: LOAD_CRYPTO_DETAILS_RECEIVED,
        details
      })
    } catch {
      dispatch({
        type: LOAD_CRYPTO_DETAILS_ERROR
      })
    }
  }
}

export function detailsReducer(state: DetailsState, action: DetailsAction): DetailsState {
  switch (action.type) {

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

function mapCandle(data: ApiResponse): Candle {
  return {
    timestamp: data.date,
    open: data.open,
    high: data.high,
    low: data.low,
    close: data.close
  }
}
