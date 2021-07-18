import { DetailsAction, detailsReducer, DetailsState, initialDetailsState } from '../modules/details/store'
import { HomeAction, homeReducer, HomeState, initialHomeState } from '../modules/home/store'
import { initialSettingsState, SettingsAction, settingsReducer, SettingsState } from '../modules/settings/store'

export type AppAction =
  | HomeAction
  | DetailsAction
  | SettingsAction

export type AppState = {
  home: HomeState,
  details: DetailsState,
  settings: SettingsState
}

export const initialAppState = {
  home: initialHomeState,
  details: initialDetailsState,
  settings: initialSettingsState
}

export function appReducer(state: AppState, action: AppAction) {
  return {
    home: homeReducer(state.home, action as HomeAction),
    details: detailsReducer(state.details, action as DetailsAction),
    settings: settingsReducer(state.settings, action as SettingsAction)
  }
}
