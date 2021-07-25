import { HomeAction, homeReducer, HomeState, initialHomeState } from '../modules/home/store'
import { initialSettingsState, SettingsAction, settingsReducer, SettingsState } from '../modules/settings/store'

export type AppAction =
  | HomeAction
  | SettingsAction

export type AppState = {
  home: HomeState
  settings: SettingsState
}

export const initialAppState: AppState = {
  home: initialHomeState,
  settings: initialSettingsState
}

export function appReducer(state: AppState, action: AppAction): AppState {
  return {
    home: homeReducer(state.home, action as HomeAction),
    settings: settingsReducer(state.settings, action as SettingsAction)
  }
}
