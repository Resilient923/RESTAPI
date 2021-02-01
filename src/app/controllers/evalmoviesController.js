const { pool } = require('../../../config/database');
const { logger } = require('../../../config/winston');
const evalmoviesDao = require('../dao/evalmoviesDao');

//유저가 평가한 영화 목록
exports.getevalmovies = async function (req, res) {
    var id = req.params.user_num
    
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const evalmoviesrows = await evalmoviesDao.getevalmovies(id);

        if (evalmoviesrows) {

            return res.json({
                isSuccess: true,
                code: 200,
                message: id + "번 유저가 평가한 영화 목록",
                data: evalmoviesrows

            });

        }
        return res.json({
            isSuccess: false,
            code: 300,
            message: "평가한 영화 목록 조회 실패"
        });
    } catch (err) {

        logger.error(`App - SignUp Query error: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};

//유저가평가한좋아요영화생성
exports.postevalmovies = async function (req, res) {

    
    var user_num = req.params.user_num;
    var movie_id = req.params.movie_id;
    
    if (!user_num) {
        return res.json({ isSuccess: false, code: 306, message: "유저번호입력해주세요" });
    }
    if (!movie_id) {
        return res.json({ isSuccess: false, code: 301, message: "영화 번호를 입력해주세요" });
    }
    try {//유저번호와 영화번호는 0보다 커야한다.
        if(user_num<=0 || movie_id<=0){
            return res.json({
                isSuccess: false,
                code: 309,
                message: "정확한 유저번호와 영화 번호를 입력해주세요."
            });
        }

        // 유저가 평가한 좋아요 영화  중복확인
        const  movie_id_rows = await evalmoviesDao.movie_idCheck(movie_id);
        const user_num_rows = await evalmoviesDao.user_numCheck(user_num);
        if (movie_id_rows.length > 0 && user_num_rows.length > 0) {
            return res.json({
                isSuccess: false,
                code: 309,
                message: "중복된 생성 입니다."
            });
        }
        //유저가평가한좋아요영화 생성
        const connection = await pool.getConnection(async (conn) => conn);
        

        const insertevalmoviesRows = await evalmoviesDao.insertevalmovies(user_num,movie_id);
        

        if (insertevalmoviesRows) {

            return res.json({
                isSuccess: true,
                code: 200,
                message: "유저가평가한좋아요영화 생성",


            });

        }
        return res.json({
            isSuccess: false,
            code: 300,
            message: "유저가평가한좋아요영화 생성 실패"
        });
    } catch (err) {

        logger.error(`App - SignUp Query error: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};

// 유저가 좋아요평가한 영화 삭제
exports.deleteevalmovies = async function (req, res) {
    var user_num = req.params.user_num;
    var movie_id = req.params.movie_id;

    try {
        if(user_num<=0 || movie_id<=0){
            return res.json({
                isSuccess: false,
                code: 309,
                message: "정확한 유저번호와 영화 번호를 입력해주세요."
            });
        }
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteevalmovies = await evalmoviesDao.deleteevalmovies(user_num,movie_id);
        

        if (deleteevalmovies.affectedRows==0) {

            return res.json({
                isSuccess: true,
                code: 300,
                message: "좋아요평가한 영화이 존재하지 않습니다",
            });
        }
        else if (deleteevalmovies) {

            return res.json({
                isSuccess: true,
                code: 200,
                message: "좋아요평가한 영화삭제 성공",
            });
        }

        
    } catch (err) {

        logger.error(`App - SignUp Query error: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};
