import { API_URL } from '../../../consts'
import moment from 'moment'

export async function loadCryptos() {
  const response = await fetch('https://poloniex.com/public?command=returnTicker', {
    method: 'GET'
  })

  return await response.json()
}
