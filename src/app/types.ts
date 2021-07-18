export type Value = string | number | boolean

export type Props = {
  [key: string]: object | Value
}

export enum RequestState {
  Initial = 'INITIAL',
  Loading = 'LOADING',
  Loaded = 'LOADED',
  Error = 'ERROR'
}
