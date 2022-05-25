const Client = require("../models/client");
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

async function create(req, res) {
    
}


module.exports = {
    create,
  };