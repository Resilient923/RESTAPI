const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');
const movieDao = require('../dao/MovieDao');

//영화 정보 조회
exports.getmovies = async function (req, res) {
    try {
        
        var id = req.params.id;
        const movierows = await movieDao.movie(id);
            if (movierows) {

                return res.json({
                    isSuccess: true,
                    code: 200,
                    message: "영화 정보 조회",
                    movie: movierows
                });
            }
            return res.json({
                isSuccess: false,
                code: 300,
                message: "영화 정보 조회 실패 "
            });
        } catch (err) {
           
            logger.error(`App - SignUp Query error: ${err.message}`);
            return res.status(500).send(`Error: ${err.message}`);
        }
};

//영화 정보 더보기 조회
exports.getmoviedetails = async function (req, res) {
    try {
        
        var id = req.params.id
        const moviedetailsrows = await movieDao.moviedetails(id);
            if (moviedetailsrows) {

                return res.json({
                    isSuccess: true,
                    code: 200,
                    message: "영화 정보 더보기 조회",
                    movieinfo: moviedetailsrows
                });
            }
            return res.json({
                isSuccess: false,
                code: 300,
                message: "영화 정보 더보기 조회 실패 "
            });
        } catch (err) {
           
            logger.error(`App - SignUp Query error: ${err.message}`);
            return res.status(500).send(`Error: ${err.message}`);
        } 
};
//영화 시청
exports.getwatchmovie = async function (req, res) {
    try {
        
        var id = req.params.id;
        const watchmovierows = await movieDao.watchmovie(id);
            if (watchmovierows) {

                return res.json({
                    isSuccess: true,
                    code: 200,
                    message: "영화 시청",
                    watchmovie: watchmovierows
                });
            }
            return res.json({
                isSuccess: false,
                code: 300,
                message: "영화 시청"
            });
        } catch (err) {
           
            logger.error(`App - SignUp Query error: ${err.message}`);
            return res.status(500).send(`Error: ${err.message}`);
        }
};
