const axios = require("axios");
const { Diet } = require("../models/db");
const ModelCRUD = require("./index");

const DietController = new ModelCRUD(Diet);

module.exports = DietController;
