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
    var getId = (num, arr) => {
        return arr.indexOf(num)
    }
    var findDifferences = (arr) => {
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
                id: responseSplit.indexOf(responseSplit[i]) + 1
            });
        };
        // console.log(finalDifferences)
        // test(finalDifferences, valuesArr, idArr);
        // low = Array.min(valuesArr);
        // testId = valuesArr.indexOf(low) + 1;
        // obj = {
        //     bestMatch: low,
        //     id: testId
        // };
        return finalDifferences; 
    };
    Array.min = function (array) {
        return Math.min.apply(Math, array);
    };
    var test = (useArr, pushArr, id) => {
        for (var i = 0; i < useArr.length; i++) {
            temp = Object.values(useArr[i]);
            // console.log(temp)
            let pop = temp.pop();
            id.push({
                id: pop
            })
            pushArr.push(temp[0]);
        };
    };
    
    var findMatch = async function () {
        var responses = [];
        var differences = [];
        var final = []; 
        let promise = new Promise(function (resolve, reject) {
            knex.select().table('users')
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
                    // console.log(differences)
                };
                resolve(differences)
                // console.log(differences)
                
                // console.log(`in promise findDifferences: ${JSON.stringify(findDifferences(differences))}`)
                // console.log(findDifferences(differences))
                // console.log(differences)
                
            })
            .catch((err) => {
                if (err) throw err
            });
            
        })

        promise.then((value) => {
           console.log(findDifferences(value)) 
        })

       
        
        // console.log(differences)
        // console.log(`out of promise findDifferences: ${JSON.stringify(findDifferences(differences))}`)
        // final.push(findDifferences(differences))
         
         
    };

    var displayRoute = (id) => {
        knex('users').where({
                id
            })
            .select('name', 'picture')
            .then((resp) => {
                // console.log(resp)
            })
            .catch(err => {
                if (err) throw err
            })
    }
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
            findMatch()
            
            // findMatch()
            // displayRoute(findMatch().id)
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