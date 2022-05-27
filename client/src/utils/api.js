const api_uri = 'http://localhost:5000/';//'https://guavas-garden-tracker.herokuapp.com/';
const axios = require('axios');

const getPlantsByType = (typeOfPlant) => {
  return axios(`${api_uri}information/${typeOfPlant}`)
    .then((res) => {
      return res.data;
    })
}


const registerUser = (user) => {
  const options = {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
  return fetch(`${api_uri}users/register`, options)
    .then(async (res) => {
      const result = await res.json();
      return result;//.json()//data;
    })
}

const loginUser = (user) => {
  const options = {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  }

  return fetch(`${api_uri}users/login/`, options)

  .then(async (res) => {
    const result = await res.json()
    return result;
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