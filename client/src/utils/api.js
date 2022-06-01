const api_uri = 'http://localhost:5000/';//'https://guavas-garden-tracker.herokuapp.com/';

const getPlantsByType = (typeOfPlant) => {
  return fetch(`${api_uri}information/${typeOfPlant}`)
    .then((res) => {
      return res.json();
    })
}

//--------//
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
    .then((res) => {
      return res.json();
    })
}
//---------//
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
      //console.log(result);
      return result;
    }
  )
}
//--------//
const getPlantByName = (typeOfPlant, nameOfPlant) => {
  return fetch(`${api_uri}information/${typeOfPlant}/${nameOfPlant}`)
    .then((res) => {
      return res.json();
    }
  )
}
//--------//
const getGardenPlants = (userName) => {
  return fetch(`${api_uri}garden_plants/${userName}`)
    .then((res) => {
      return res.json();
    }
  )
}
//--------//
const updateCount = (data) => {
  const options = {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      username: data.username,
      plant: {
        name: data.plant,
        count: data.count
      }
    })
  }

  return fetch(`${api_uri}garden_plants/`, options)
  .then((res) => {
    return res.json();
  })
}

export {getPlantsByType, getPlantByName, registerUser, loginUser, updateCount, getGardenPlants};