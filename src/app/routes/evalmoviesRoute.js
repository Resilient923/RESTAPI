module.exports = function(app){
    const evalmovies = require('../controllers/evalmoviesController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
   
    app.get('/user/:user_num/eval-movies',evalmovies.getevalmovies);
    app.post('/user/:user_num/eval-movies/:movie_id',evalmovies.postevalmovies);
    app.delete('/user/:user_num/eval-movies/:movie_id',evalmovies.deleteevalmovies);
    
    
  

};
