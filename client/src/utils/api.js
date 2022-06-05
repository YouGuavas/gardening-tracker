const api_uri = 'https://guavas-garden-tracker.herokuapp.com/';
//---------//
const getPlantsByType = async (typeOfPlant) => {
  const res = await fetch(`${api_uri}information/${typeOfPlant}`);
  return await res.json();
}
//--------//
const registerUser = async (user) => {
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

  const res = await fetch(`${api_uri}users/register`, options);
  return await res.json();
}
//---------//
const loginUser = async (user) => {
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

  const res = await fetch(`${api_uri}users/login/`, options);
  return await res.json();
}
//--------//
const getPlantByName = async (typeOfPlant, nameOfPlant) => {
  const res = await fetch(`${api_uri}information/${typeOfPlant}/${nameOfPlant}`);
  return await res.json();
}
//--------//
const getGardenPlants = async (data) => {
  const { _id, token} = data;
  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }
  const res = await fetch(`${api_uri}garden_plants/${_id}`, options);
  return await res.json();
}
//-------//
const fetchGardenData = async () => {
  if (localStorage['gardeningTrackerLogin']) {
    const user = JSON.parse(localStorage['gardeningTrackerLogin']);
    return await getGardenPlants(user);
  }
}
//---------//
const checkAuth = async () => {
    const user = JSON.parse(localStorage['gardeningTrackerLogin']);
    const options = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      }
    }
    const res = await fetch(`${api_uri}users/isloggedin/`, options);
    return await res.json();
}
//--------//
const updateCount = async (data) => {
  const { plant, count } = data;
  const token = JSON.parse(localStorage['gardeningTrackerLogin']).token;
  const username = JSON.parse(localStorage['gardeningTrackerLogin']).username;
  const options = {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      username: username,
      plant: {
        name: plant,
        count: count
      }
    })
  }
  const res = await fetch(`${api_uri}garden_plants/`, options);
  return await res.json();
}
//--------//
export {checkAuth, fetchGardenData, getPlantsByType, getPlantByName, registerUser, loginUser, updateCount, getGardenPlants};