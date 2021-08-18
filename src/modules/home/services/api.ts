import { API_URL } from '../../../consts'

export async function loadCryptos() {
  const response = await fetch('https://poloniex.com/public?command=returnTicker', {
    method: 'GET'
  })

  return await response.json()
}

export async function loadCryptoChart(tokenId: string) {
  const response = await fetch(API_URL + `/coins/${tokenId}/ohlc?vs_currency=usd&days=200`, {
    method: 'GET'
  })

  return await response.json()
}
