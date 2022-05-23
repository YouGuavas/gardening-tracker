const api_uri = 'https://guavas-garden-tracker.herokuapp.com/';
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


const getPlantByName = (typeOfPlant, nameOfPlant) => {
  return axios.get(`${api_uri}information/${typeOfPlant}/${nameOfPlant}`)
    .then((res) => {
      return res.data;
    })
}
const getGardenPlants = (userName) => {
  return axios.get(`${api_uri}garden_plants/${userName}`)
    .then((res) => {
      return res.data;
    })
}

const updateCount = (data) => {
  return axios.post(`${api_uri}garden_plants/`,
    {
      username: data.username,
      plant: {
        name: data.plant,
        count: data.count
      }
    }
  )
  .then((res) => {
    return res.data;
  })

}

export {getPlantsByType, getPlantByName, registerUser, loginUser, updateCount, getGardenPlants};