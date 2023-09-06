import axios from 'axios';

export const carDetails =  (name: string, model: string, year: string): Promise<any> => {
  return axios.get(`https://api.nhtsa.gov/vehicles/bySearch?offset=0&max=10&sort=id&data=none&dateEnd=&dateStart=&name=&productDetail=all&query=${year} ${name} ${model}`)
    .then((response: { data: { results: any; }; }) => {
      const data = response.data.results;
      return data;
    })
    .catch((error: any) => {
      console.log(error)
    });
}

export const complaintsCall = (name: string, model: string, year: string) => {
  return axios.get(`https://api.nhtsa.gov/complaints/complaintsByVehicle?make=${name}&model=${model}&modelYear=${year}`)
  .then((response) => {
    const data = response.data.results
    return data;
  })
  .catch((error) => {
    console.log(error)
  });
}

export const recallsCall = (vehicleID : number) => {
  return axios.get(`https://api.nhtsa.gov/vehicles/${vehicleID}/details?data=recalls&productDetail=minimal&name=`)
  .then((response) => {
    const data =  response.data.results[0].safetyIssues.recalls
    return data
  })
  .catch((error) => {
    console.log(error)
  });
}
