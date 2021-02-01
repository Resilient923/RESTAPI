module.exports = function(app){
    const program = require('../controllers/programController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
   
    app.get('/program/:id',program.getprogram);
    app.get('/program/:id/details',program.getprogramdetails);
    app.get('/program/:id/episodes',program.getprogramepisode);
    app.get('/watch-episodes/:id',program.getwatchprogram);
  

};
