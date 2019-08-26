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
    var findMatch = () => {
        knex.select().table('users')
            .then((result) => {
                console.log(result.length); 
                for (var i = 0; i < result.length; i++) {
                    var string = JSON.stringify(result[i].responses);
                    let split = string.split('');
                    var secondString = JSON.stringify(result[i++].responses);
                    let secondSplit = secondString.split('');
                    for (var i = 0; i < split.length; i++) {
                        for (var i = 0; i < secondSplit.length; i++) {
                            let num1 = split[i];
                            let num2 = secondSplit[i];
                            let difference = num1- num2
                            console.log(difference)
                        };
                    };
                };
            })
            .catch((err) => {
                if (err) throw err
            });
    };
    // add routes
    router.route('/new')
        .post((req, res) => {
            var postArr = Object.values(req.body)
            // knex('users').insert({
            //         name: req.body.name,
            //         picture: req.body.picture,
            //         responses: toPost(postArr)
            //     })
            //     .then(function (result) {
            //        console.log('ok'); 
            //     })
            //     .catch((err) => {
            //         if (err) throw err
            //     });
            findMatch();
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