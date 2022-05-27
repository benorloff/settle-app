import tokenService from "./tokenService";
import stripeService from "./stripeService";

const BASE_URL = "/api/users/";

// NOTE THIS IS configured to send of a multi/part form request
// aka photo
function signup(user) {
  return (
    fetch(BASE_URL + "signup", {
      method: "POST",
      body: user
    })
    .then((res) => {
      console.log(res, 'res from userService.signup')
      if (res.ok) return res.json();
      // Probably a duplicate email
      throw new Error("Email already taken!");
    })
    // Parameter destructuring!
    .then(({ token }) => tokenService.setToken(token))
    // Get the accountLink from res.json and set it to local storage
    // .then(({ accountLink }) => stripeService.setAccountLink(accountLink))
  );
  // Setting our token in localStorage in our browser
  // then we'll be able to use with every request!
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

const userService = {
  signup,
  logout,
  login,
  getUser,
};

export default userService;
