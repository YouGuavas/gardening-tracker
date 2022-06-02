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
      return await res.json();
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
const getGardenPlants = (data) => {
  const { _id, username, email, token} = data;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return fetch(`${api_uri}garden_plants/${_id}`, options)
    .then((res) => {
      return res.json();
    }
  )
}

const fetchGardenDatal = async () => {
  if (localStorage['gardeningTrackerLogin']) {
    const user = JSON.parse(localStorage['gardeningTrackerLogin']);
    const localPlants = await getGardenPlants(user);
    return localPlants;
  }
}
//---------//
const checkAuth = (data) => {
  const { _id, username, email, token} = data;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  return fetch(`${api_uri}isloggedin`, options)
    .then((res) => {

    })
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

export {fetchGardenDatal, getPlantsByType, getPlantByName, registerUser, loginUser, updateCount, getGardenPlants};