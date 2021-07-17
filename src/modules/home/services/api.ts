import { API_URL } from '../../../consts'

export async function loadCryptos() {
  const response = await fetch(API_URL + '/coins/list', {
    method: 'GET'
  })

  const x = await response.json()
  
  console.log('x')

  return x
}
