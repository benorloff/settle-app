const Client = require("../models/client");
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

async function create(req, res) {
    const fullName = `${req.body.firstName} ${req.body.lastName}`
    try {
        // Create Stripe Customer object
        const customer = await stripe.customers.create(
            {
                email: req.body.email,
                name: fullName,
                address: {
                    line1: req.body.address1,
                    line2: req.body.address2,
                    city: req.body.city,
                    state: req.body.state,
                    postal_code: req.body.zipCode,
                    country: req.body.country
                }, 
                metadata: {
                    company: req.body.company,
                    role: req.body.role
                }
            },
            {stripeAccount: req.user.stripeAccountId}
        )
        // Create client in DB
        const client = await new Client({ ...req.body, userId: req.user, stripeCustomerId: customer.id });
        await client.save();
        res.status(201).json({client})
    } catch (err) {
        // Probably a duplicate email
        console.log(err);
        res.status(400).json(err);
    }
}

async function index(req, res) {
    try {
        const customers = await stripe.customers.list({
            stripeAccount: req.user.stripeAccountId
        })
        res.status(200).json({customers})
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function show(req, res) {
    try {
        const customer = await stripe.customers.retrieve(
            req.params.id,
            {
                stripeAccount: req.user.stripeAccountId
            }
        )
        res.status(200).json({customer})
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function getRecent(req, res) {
    try {
        const customers = await stripe.customers.search({
            query: 'created>0',
            limit: 4,
        }, {
            stripeAccount: req.user.stripeAccountId
        })
        res.status(200).json({customers})
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}


module.exports = {
    create,
    index,
    show,
    getRecent,
  };