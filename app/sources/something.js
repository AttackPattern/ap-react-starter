const api = 'http://some.url';
const action = '/path/?with=queryparams';

export const getSomething = () => {
  return fetch(`${api}/${action}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
