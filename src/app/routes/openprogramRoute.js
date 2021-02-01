module.exports = function(app){
    const openprogram = require('../controllers/openprogramController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
   
    app.get('/openprograms',openprogram.getopenprograms);
    

};
