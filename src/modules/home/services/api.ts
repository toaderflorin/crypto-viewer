import { API_URL } from '../../../consts'

export async function loadCryptos() {
  const response = await fetch(API_URL + '/coins/list?include_platform=true', {
    method: 'GET'
  })

  return await response.json()
}

export async function loadCryptoChart(tokenId: string) {
  const response = await fetch(API_URL + `/coins/${tokenId}/tickers`, {
    method: 'GET'
  })

  return await response.json()
}