import { useContext } from 'react'
import { AppContext } from '../components/AppContext'

export function useAppContext() {
  return useContext(AppContext) 
}
