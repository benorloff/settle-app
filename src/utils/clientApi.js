import tokenService from './tokenService';

const BASE_URL = "/api/clients/";

function create(clientData) {
    return (
        fetch(BASE_URL, {
            method: "POST",
            body: clientData,
            headers: {
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        })
        .then((res) => {
            if (res.ok) return res.json();
            // Probably a duplicate email
            throw new Error("Uh oh! Are you sure this client doesn't already exist?");
        })
    );
}


const clientApi = {
    create,
  };
  
  export default clientApi;