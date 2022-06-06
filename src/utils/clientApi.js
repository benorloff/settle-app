import tokenService from './tokenService';

const BASE_URL = "/api/clients/";

async function create(client) {
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

async function getAll() {
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

async function getRecent() {
    return fetch(BASE_URL + 'recent', {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res) => {
        if(res.ok) return res.json();
        throw new Error('Error retrieving recent clients.')
    })
}

async function getOne(id) {
    return fetch(BASE_URL + id, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json()
        throw new Error('Client not found!')
    })
}

const clientApi = {
    create,
    getAll,
    getRecent,
    getOne,
  };
  
export default clientApi;