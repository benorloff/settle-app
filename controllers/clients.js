const Client = require("../models/client");
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

async function create(req, res) {
    console.log(req.body, '<- req.body')
    try {
        // CREATE STRIPE CUSTOMER ID HERE
        // const customer = await stripe.customers.create({
        //     key: 'value',
        //     key: 'value'
        // })
        const client = await new Client({ ...req.body, userId: req.user });
        await client.save();
        console.log(client, '<-client created from clientsCtrl.create')
        res.status(201).json({client})
    } catch (err) {
        // Probably a duplicate email
        console.log(err);
        res.status(400).json(err);
    }
}

async function index(req, res) {
    try {
        const clients = await Client.find({userId: req.user}).exec()
        res.status(200).json({clients})
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}


module.exports = {
    create,
    index,
  };