const api_uri = 'http://localhost:5000/';
const axios = require('axios');

const getPlantsByType = (typeOfPlant) => {
  return axios(`${api_uri}information/${typeOfPlant}`)
    .then((res) => {
      return res.data;
    })
}

export {getPlantsByType};