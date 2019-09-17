const path = require('path');
const knex = require('../../knex/knex');
const _ = require('lodash');


module.exports = (express) => {
    // Create express Router
    var router = express.Router();

    var toPost = (arr) => {
        
        arr.sort(function(a, b){
            return a.question - b.question
        });
        let result = arr.map(n => n.answer ).join('')
        return Number(result)
    };
    var getId = (num, arr) => {
        return arr.indexOf(num)
    }
    var findDifferences = async (arr) => {
        responseSplit = [];
        finalDifferences = [];
        valuesArr = [];
        idArr = [];
        let chop = arr.splice(arr.length - 9, arr.length);
        while (arr.length) {
            responseSplit.push(arr.splice(0, 9));
        };
        for (var i = 0; i < responseSplit.length; i++) {
            var num = 0;
            for (var n = 0; n < responseSplit[i].length; n++) {
                num += Math.abs(responseSplit[i][n]);
            };
            finalDifferences.push({
                pointsOff: num,
                id: responseSplit.indexOf(responseSplit[i]) * 10 + 2 
            });
        };

        return getSmallestDifference(finalDifferences);
    };
    Array.min = function (array) {
        return Math.min.apply(Math, array);
    };
    var getSmallestDifference = (useArr) => {
        let values = [];
        let ids = [];
        for (var i = 0; i < useArr.length; i++) {
            let objValues = Object.values(useArr[i]);
            values.push(objValues[0]);
            ids.push(objValues[1])
        }
        return {
            difference: Array.min(values),
            id: ids[values.indexOf(Array.min(values))]
        }
    };

    var findMatch = function () {
        var responses = [];
        var differences = [];
        var final = [];
        return new Promise(function (resolve, reject) {
            knex('users').select()
                .then((result) => {
                    var resSpl
                    result.forEach(element => {
                        var resStr = JSON.stringify(element.responses);
                        resSpl = resStr.split('');
                        responses.push(resSpl);
                    });
                    for (var i = 0; i < responses.length; i++) {
                        let newArr = responses[responses.length - 1];
                        for (var n = 0; n < responses[i].length; n++) {
                            var num = responses[responses.length - 1][n];
                            var num2 = responses[i][n]
                            differences.push(num - num2);
                        };
                    };
                    resolve(findDifferences(differences))
                })
                .catch((err) => {
                    if (err) throw err
                });
        })
    };

    var displayRoute = id => {
        return new Promise((resolve, reject) => {
            knex('users').where('id', Number(id.id))
            .select('name', 'picture')
            .then((resp) => {
                resolve(resp)
            })
            .catch(err => {
                console.log( {err: err, message: err.message} )
            })
        })
    };
    router.post('/new', (req, res) => {
            // var postArr = Object.values(req.body)
            knex('users').insert({
                    name: req.body.name, 
                    picture: req.body.picture,
                    responses: toPost(req.body.responses)
                })
                .then(function (result) {
                   return findMatch()
                })
                .then(function (result) {
                    let id = displayRoute(result) 
                    return id   
                })
                .then(function (result) {
                    res.status(200).send(result)
                })
                .catch((err) => {
                    res.status(400).json( {err: err, message: err.message} );  
                });
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