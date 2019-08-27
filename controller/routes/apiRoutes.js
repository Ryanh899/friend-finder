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
        finalDifference = [];
        otherDif = [];
        valuesArr = [];
        idArr = [];
        let chop = arr.splice(arr.length - 9, arr.length);
        while (arr.length) {
            finalDifference.push(arr.splice(0, 9));
        };
        // console.log(finalDifference);
        for (var i = 0; i < finalDifference.length; i++) {
            let num = 0;
            for (var n = 0; n < finalDifference[i].length; n++) {
                num += Math.abs(finalDifference[i][n]);
            };
            otherDif.push({
                pointsOff: num,
                id: finalDifference.indexOf(finalDifference[i])
            });
        };
        test(otherDif, valuesArr, idArr);
        low = Array.min(valuesArr);
        testId = valuesArr.indexOf(low) + 1;
        return {
            bestMatch: low,
            id: testId
        };
    };
    Array.min = function (array) {
        return Math.min.apply(Math, array);
    };
    var test = (useArr, pushArr, id) => {
        for (var i = 0; i < useArr.length; i++) {
            temp = Object.values(useArr[i]);
            let pop = temp.pop();
            id.push({
                id: pop
            })
            pushArr.push(temp[0]);
        };
    };

    var findMatch = () => {
        responses = [];
        differences = [];
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
                        let num = responses[responses.length - 1][n];
                        let num2 = responses[i][n]
                        // console.log(`${num} - ${num2} = ${num - num2}`);
                        differences.push(num - num2);
                    };
                };
                // findDifferences(differences); 
                console.log(findDifferences(differences))
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