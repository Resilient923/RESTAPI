module.exports = function(app){
    const mypickprograms = require('../controllers/mypickprogramsController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
   
    app.get('/mypicks/:user_num',mypickprograms.getmypicks);
    app.post('/user/:user_num/mypick-programs/:program_id',mypickprograms.postmypickprograms);
    app.delete('/user/:user_num/mypick-programs/:program_id',mypickprograms.deletemypickprograms);
    
    
  

};
