import { DetailsAction, detailsReducer, DetailsState, initialDetailsState } from '../modules/details/store'
import { HomeAction, homeReducer, HomeState, initialHomeState } from '../modules/home/store'

export type AppAction =
  | HomeAction
  | DetailsAction

export type AppState = {
  home: HomeState
  details: DetailsState
}

export const initialAppState: AppState = {
  home: initialHomeState,
  details: initialDetailsState
}

export function appReducer(state: AppState, action: AppAction): AppState {
  return {
    home: homeReducer(state.home, action as HomeAction),
    details: detailsReducer(state.details, action as DetailsAction)
  }
}
