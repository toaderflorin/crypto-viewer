import { Dispatch } from 'react'

export type DetailsState = {}

export type DetailsAction = any

export const initialDetailsState = {}

export function detailsReducer(state: DetailsState, action: DetailsAction) {
  switch (action.type) {
    default: {
      return state
    }
  }
}
