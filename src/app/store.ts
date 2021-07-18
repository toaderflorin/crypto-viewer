import { DetailsAction, detailsReducer, DetailsState } from '../modules/details/store'
import { HomeAction, homeReducer, HomeState } from '../modules/home/store'
import { SettingsAction, settingsReducer, SettingsState } from '../modules/settings/store'

type AppAction =
  | HomeAction
  | DetailsAction
  | SettingsAction

export type AppState = {
  home: HomeState
  details: DetailsState
  settings: SettingsState
}

export function appReducer(state: AppState, action: AppAction) {
  return {
    home: homeReducer(state.home, action as HomeAction),
    details: detailsReducer(state.details, action as DetailsAction),
    settings: settingsReducer(state.settings, action as SettingsAction)
  }
}
