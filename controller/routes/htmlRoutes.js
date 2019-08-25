const path = require('path'); 

module.exports = (function () {
    'use strict';
    var externalRoutes = require('express').Router();
    externalRoutes.get('/',  (req, res) => {
        res.sendFile(path.join(__dirname + '/../../view/public/home.html'));
    });
    return externalRoutes;
})();
