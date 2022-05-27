const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initialize the construcotr
// now s3 can crud on our s3 buckets

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  signup,
  login,
};

async function signup(req, res) {
  console.log(req.body, '<-req.body', req.file, '<-req.file');

  const filePath = `users/${uuidv4()}-${req.file.originalname}`;
  console.log(filePath, '<-aws filePath')
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
    Body: req.file.buffer,
  };
  console.log(params, '<-aws params')
  
  const account = await stripe.accounts.create({
    type: 'standard',
    email: req.body.email,
  });
  console.log(account, '<-stripe account object')

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: 'http://localhost:3000/login',
    return_url: 'http://localhost:3000/dashboard',
    type: 'account_onboarding',
  })
  console.log(accountLink.url, '<-stripe accountLink.url')

  s3.upload(params, async function (err, data) {
    console.log(data, "data from aws"); 
    const user = new User({ 
      ...req.body, 
      photoUrl: data.Location, 
      stripeAccountId: account.id,
      stripeAccountLinkUrl: accountLink.url 
    });
    console.log(user, 'new user');
    try {
      await user.save();
      console.log(user, 'user after user.save')
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    };
  });
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user, " this user in login");
    if (!user) return res.status(401).json({ err: "bad credentials" });
    // had to update the password from req.body.pw, to req.body password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
