const api_uri = 'http://localhost:5000/';
const axios = require('axios');

const getPlantsByType = (typeOfPlant) => {
  return axios(`${api_uri}information/${typeOfPlant}`)
    .then((res) => {
      return res.data;
    })
}
const registerUser = (user) => {
  return axios.post(`${api_uri}users/register/`,
    {
      username: user.username,
      email: user.email,
      password: user.password
    }
  )
  .then((res) => {
    return res.data;
  })
}

const loginUser = (user) => {
  return axios.post(`${api_uri}users/login/`,
    {
      username: user.username,
      password: user.password
    }
  )
  .then((res) => {
    return res.data;
  })
}

export {getPlantsByType, registerUser, loginUser};