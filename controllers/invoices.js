const Invoice = require("../models/invoice");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

async function create(req, res) {
    try {
        console.log(req.body, 'req.body')
        const invoice = await Invoice.create(req.body);
        console.log(invoice)
        res.status(201).json({ invoice: invoice })
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function index(req, res) {
    try {
        const invoices = await Invoice.find({userId: req.user}).exec()
        res.status(200).json({invoices})
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports = {
    create,
    index,
};