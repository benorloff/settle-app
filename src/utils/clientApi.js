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
            throw new Error("Bad Credentials!");
        })
    );
}

function getAll() {
    return (
        fetch(BASE_URL, {
            headers: {
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        }).then(res => {
            if (res.ok) return res.json();
            throw new Error('Bad Credentials!')
        })
    )
}


const clientApi = {
    create,
    getAll,
  };
  
  export default clientApi;