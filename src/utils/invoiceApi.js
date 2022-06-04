import tokenService from "./tokenService"

const BASE_URL = '/api/invoices/'

async function create(invoice) {
    return fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(invoice),
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        // Valid creation if we have a status of 2xx (res.ok)
        if (res.ok) return res.json();
        throw new Error("Bad Credentials!");
    })
}

async function getAll() {
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        } 
    })
    .then((res) => {
        if(res.ok) return res.json();
        throw new Error('Bad Credentials!')
    })
}

async function getRecent() {
    return fetch(BASE_URL + 'recent', {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        } 
    })
    .then((res) => {
        if(res.ok) return res.json();
        throw new Error('Bad Credentials!')
    })
}

const invoiceApi = {
    create,
    getAll,
    getRecent,
};
  
export default invoiceApi;