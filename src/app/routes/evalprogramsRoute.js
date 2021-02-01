module.exports = function(app){
    const evalprograms = require('../controllers/evalprogramsController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
   
    app.get('/user/:user_num/eval-programs',evalprograms.getevalprograms);
    app.post('/user/:user_num/eval-programs/:program_id',evalprograms.postevalprograms);
    app.delete('/user/:user_num/eval-programs/:program_id',evalprograms.deleteevalprograms);
    
    
  

};
