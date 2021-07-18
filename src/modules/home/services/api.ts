import { API_URL } from '../../../consts'

export async function loadCryptos() {
  const response = await fetch(API_URL + '/coins/list?include_platform=true', {
    method: 'GET'
  })

  const x = await response.json()
  
  console.log('x', x)

  return x
}
