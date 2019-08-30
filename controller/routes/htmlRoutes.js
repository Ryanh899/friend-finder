const path = require('path');

module.exports = (express) => {
    //create router
    var router = express.Router();

    //routes
    router.route('/')
        .get((req, res) => {
            res.sendFile(path.join(__dirname + '/../../view/home.html'));
        });
    router.route('/survey')
        .get((req, res) => {
            res.sendFile(path.join(__dirname + '/../../view/survey.html'));
        });

    return router; 
}; 