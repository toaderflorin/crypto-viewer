import { HomeAction, homeReducer, HomeState, initialHomeState } from '../modules/home/store'

export type AppAction =
  | HomeAction

export type AppState = {
  home: HomeState
}

export const initialAppState: AppState = {
  home: initialHomeState,
}

export function appReducer(state: AppState, action: AppAction): AppState {
  return {
    home: homeReducer(state.home, action as HomeAction)
  }
}
