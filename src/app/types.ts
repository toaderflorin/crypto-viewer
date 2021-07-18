export type Value = string | number | boolean

export type Props = {
  [key: string]: object | Value
}

export enum RequestState {
  Null = 'NULL',
  Loading = 'LOADING',
  Loaded = 'LOADED',
  Error = 'ERROR'
}

export type ApiResponse = any
