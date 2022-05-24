const Invoice = require("../models/invoice");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

module.exports = {
    create,
    index,
  };

function create(req, res) {
    pass
}

function index(req, res) {
    pass
}