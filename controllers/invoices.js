const Invoice = require("../models/invoice");
const Client = require("../models/client");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const invoice = require("../models/invoice");
const { faExternalLinkSquare } = require("@fortawesome/free-solid-svg-icons");
const s3 = new S3();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function create(req, res) {

    const client = await Client.findById(req.body.clientId);
    const stripeAccountId = await req.user.stripeAccountId
    const stripeCustomerId = await client.stripeCustomerId;
    const stripeInvoiceItems = []

    const dateStr = req.body.dueDate
    const date = new Date(dateStr)
    const unixTimestamp = Math.floor(date.getTime() / 1000)
    const dueDateUnix = unixTimestamp > Date.now() ? unixTimestamp : (Math.floor(date.getTime() / 1000) + 86399)

    async function invoiceItem(item) {
        const invoiceItem = await stripe.invoiceItems.create({
            customer: stripeCustomerId,
            description: item.name,
            quantity: item.quantity,
            currency: "usd",
            unit_amount: item.rate * 100
        }, {
            stripeAccount: stripeAccountId
        })
        return invoiceItem;
    }

    const invoiceItems = await req.body.invoiceItems.forEach((item) => stripeInvoiceItems.push(invoiceItem(item)))

    const stripeInvoice = await stripe.invoices.create({
        customer: stripeCustomerId,
        collection_method: 'send_invoice',
        due_date: dueDateUnix,
        description: req.body.notes,
        footer: req.body.terms,
    }, {
        stripeAccount: stripeAccountId,
    });

    const finalizeInvoice = await stripe.invoices.finalizeInvoice(
        stripeInvoice.id, 
        { stripeAccount: stripeAccountId }
    )

    try {
        console.log(req.body, 'req.body')
        const invoice = await Invoice.create({
            ...req.body,
            stripeInvoiceId: stripeInvoice.id
        });
        res.status(201).json({ invoice: invoice })
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function index(req, res) {
    try {
        const invoices = await stripe.invoices.list({
            stripeAccount: req.user.stripeAccountId
        })
        const invoiceData = await invoices.data
        res.status(200).json({invoiceData})
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function show(req, res) {
    try {
        const invoice = await stripe.invoices.retrieve(
            req.params.id,
            {
                stripeAccount: req.user.stripeAccountId
            }
        )
        console.log(invoice, '<--invoice from show function')
        res.status(200).json({invoice})
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function getRecent(req, res) {
    try {
        const invoices = await stripe.invoices.search({
            query: 'total>0',
            limit: 4,
        }, {
            stripeAccount: req.user.stripeAccountId
        })
        console.log(invoices, '<--invoices from getRecent')
        const invoiceData = await invoices.data
        console.log(invoiceData, '<--invoiceData from getRecent')
        console.log(req.user.stripeAccountId, '<--stripeAccountId from getRecent')
        res.status(200).json({invoiceData})
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