const api_uri = 'http://localhost:5000/';
const axios = require('axios');

const getPlantsByType = (typeOfPlant) => {
  return axios(`${api_uri}information/${typeOfPlant}`)
    .then((res) => {
      return res.data;
    })
}
const getPlantByName = (typeOfPlant, nameOfPlant) => {
  return axios(`${api_uri}information/${typeOfPlant}/${nameOfPlant}`)
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



const getGardenPlants = () => {
  return axios.get(`${api_uri}garden_plants/`)
    .then((res) => {
      return res.data;
    })
}
const testCount = () => {
  return axios.get(`${api_uri}garden_plants/`)
  .then((res) => {
    console.log('done');
  })
}

const updateCount = (data) => {
  return axios.post(`${api_uri}garden_plants/`,
    {
      username: data.username,
      plant: data.plant
    }
  )
  .then((res) => {
    return res.data;
  })

}

export {getPlantsByType, getPlantByName, registerUser, loginUser, updateCount, testCount, getGardenPlants};