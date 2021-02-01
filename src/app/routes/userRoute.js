module.exports = function(app){
    const user = require('../controllers/userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.route('/signUp').post(user.signUp);
    app.route('/login').post(user.signIn);
    app.get('/usermypage/:user_num', jwtMiddleware, user.check);
    
};