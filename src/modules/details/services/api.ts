import moment from 'moment'

export async function loadCryptoChart(tokenId: string) {
  const startDt = moment().add(-200, 'days').unix()
  const endDt = moment().unix()
  const response = await fetch(`https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start=${startDt}&end=${endDt}&period=86400`, {
    method: 'GET'
  })

  return await response.json()
}
