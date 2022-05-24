import tokenService from "./tokenService"

const BASE_URL = '/api/invoices/'

export async function create(invoiceData) {
    return fetch(BASE_URL, {
        method: 'POST',
        body: invoiceData,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
    .then((res) => {
        // Valid creation if we have a status of 2xx (res.ok)
        if (res.ok) return res.json();
        throw new Error("Bad Credentials!");
    })
}

export async function getAll() {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        } 
    })
    .then((res) => {
        if(res.ok) return res.json();
        throw new Error('Bad Credentials!')
    })
}