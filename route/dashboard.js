const express = require('express');
const route = express.Router();
const ensureAuthenticated = require('../setup/ensureAuthenticated')

route.get('/:id', ensureAuthenticated, (req, res) => {
    res.send(req.params.id)
})
module.exports = route;