async function registerUser(credentials) {
  return fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
}

async function getUsers() {
  return fetch('http://localhost:8080/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(data => data.json())
}

export {
  registerUser,
  getUsers
}