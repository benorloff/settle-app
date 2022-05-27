function setAccountLinkToken(accountLinkToken) {
    if (accountLinkToken) {
      localStorage.setItem("accountLinkToken", accountLinkToken);
    } else {
      localStorage.removeItem("accountLinkToken");
    }
  }

function getAccountLinkToken() {
    let accountLinkToken = localStorage.getItem("accountLinkToken");
    if (accountLinkToken) {
        const payload = JSON.parse(atob(accountLinkToken.split(".")[1]));
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem("accountLinkToken");
            accountLinkToken = null;
        }
    }
    return accountLinkToken
}

function getUrlFromAccountLinkToken() {
    const accountLinkToken = getAccountLinkToken();
    return accountLinkToken ? JSON.parse(atob(accountLinkToken.split(".")[1])).url : null;
}
  
function removeAccountLinkToken() {
    localStorage.removeItem("accountLinkToken");
}

const stripeService = {
    setAccountLinkToken,
    getAccountLinkToken,
    getUrlFromAccountLinkToken,
    removeAccountLinkToken,
};
  
export default stripeService;