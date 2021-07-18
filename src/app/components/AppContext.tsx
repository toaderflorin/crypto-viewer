import React, { useReducer, Dispatch, createContext } from 'react'
import { AppAction, appReducer, AppState, initialAppState } from '../store'

export type DispatchFunc = (state: AppState, dispatch: Dispatch<AppAction>) => Promise<void> | void

export type AppContextType = {
  state: AppState
  dispatch: (action: DispatchFunc) => Promise<void>
}

export const AppContext = createContext({} as any as AppContextType)

export type Value = string | number | boolean

export type Props = {
  [key: string]: object | Value
}

export default function AppContextProvider(props: Props) {
  const { children } = props
  const [state, dispatch] = useReducer(appReducer, initialAppState)

  async function contextDispatch(action: (state: AppState, dispatch: Dispatch<AppAction>) => Promise<void> | void) {  
    await action(state, dispatch)
  }

  const contextValue = {
    state,
    dispatch: contextDispatch
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}
