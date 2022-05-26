function setAccountLink(accountLink) {
    if (accountLink) {
      localStorage.setItem("accountLink", accountLink);
    } else {
      localStorage.removeItem("accountLink");
    }
  }

function getAccountLink() {
    let accountLink = localStorage.getItem("accountLink");
    if (accountLink) {
        const payload = JSON.parse(atob(accountLink.split(".")[1]));
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem("accountLink");
            accountLink = null;
        }
    }
    return accountLink
}

function getUrlFromAccountLink() {
    const accountLink = getAccountLink();
    return accountLink ? JSON.parse(atob(accountLink.split(".")[1])).url : null;
}
  
function removeAccountLink() {
    localStorage.removeItem("accountLink");
}

const stripeService = {
    setAccountLink,
    getAccountLink,
    getUrlFromAccountLink,
    removeAccountLink,
};
  
export default stripeService;