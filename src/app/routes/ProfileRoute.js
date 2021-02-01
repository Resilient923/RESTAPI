module.exports = function(app){
    const profile = require('../controllers/ProfileController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
   
    app.get('/profiles',profile.getprofile);
    app.post('/profiles/:profile_id',profile.postprofile);
    app.delete('/profiles/:profile_id',profile.deleteprofile);
    app.patch('/profiles/:profile_id',profile.patchprofiles);
  

};
