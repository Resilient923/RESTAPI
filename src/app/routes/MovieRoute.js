module.exports = function(app){
    const movie = require('../controllers/MovieController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    
    app.get('/movies/:id', movie.getmovies);
    app.get('/movie/:id/details',movie.getmoviedetails);
    app.get('/watch-movies/:id',movie.getwatchmovie);
   

};
