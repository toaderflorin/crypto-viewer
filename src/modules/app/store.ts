import { HomeState } from '../home/store'

type SettingsAction = any

export type AppState = {
  home: HomeState 
}

export function appReducer(state: DetailsState, action: SettingsAction) {
  switch (action.type) {
    default: {
      return state
    }
  }
}
