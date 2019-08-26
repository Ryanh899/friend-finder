const path = require('path');
const knex = require('../../knex/knex');
const _ = require('lodash');


module.exports = (express) => {
    // Create express Router
    var router = express.Router();

    var toPost = (arr) => {
        for (var i = 0; i < arr.length; i++) {
            var firstTwo = arr.splice(0, 2);
            return arr.join('')
        }
    };
    // add routes
    router.route('/new')
        .post((req, res) => {
            var postArr = Object.values(req.body)
            knex('users').insert({
                    name: req.body.name,
                    picture: req.body.picture,
                    responses: toPost(postArr)
                })
                .then(function (result) {
                   console.log('ok'); 
                })
                .catch((err) => {
                    if (err) throw err
                });
           res.redirect('/')
        });
    var toSend = knex.select().table('users')
        .then((resp) => {
            return resp
        })
        .catch((err) => {
            if (err) throw err;
        });
    router.route('/json')
        .get((req, res) => {
            res.json(toSend)
        });

    return router;
};

