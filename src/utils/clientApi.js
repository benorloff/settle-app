import tokenService from './tokenService';

const BASE_URL = "/api/clients/";

function create(client) {
    return (
        fetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify(client),
            headers: {
                'Authorization': 'Bearer ' + tokenService.getToken(),
                'Content-Type': 'application/json',
            }
        }).then(res => {
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