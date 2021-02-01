module.exports = function(app){
    const mypickmovies = require('../controllers/mypickmoviesController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
   
  
    app.post('/user/:user_num/mypick-movies/:movie_id',mypickmovies.postmypickmovies);
    app.delete('/user/:user_num/mypick-movies/:movie_id',mypickmovies.deletemypickmovies);
    
    
  

};
