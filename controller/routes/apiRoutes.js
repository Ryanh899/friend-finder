const path = require('path');
const knex = require('../../knex/knex');
const _ = require('lodash'); 

module.exports = (function () {
    'use strict';
    var externalRoutes = require('express').Router();
    externalRoutes.get('/survey', (req, res) => {
        res.sendFile(path.join(__dirname + '/../../view/public/survey.html'))
    });
    var toSend = knex.select().table('users')
    .then((resp) => { 
        return resp
    })
    .catch((err) => { if (err) throw err; }); 
    externalRoutes.get('/json', (req, res) => {
        res.send(toSend)
    });
    externalRoutes.post('/survey', (req, res) => {
        console.log(req.body);
        var data = req.body;
   
   res.send(data);
   console.log(data);
    // let use = _.pick(req.body, 'name', 'picture')
    //     knex.insert([
    //         {
                
    //         }
    //     ])
    });
    return externalRoutes;
})();