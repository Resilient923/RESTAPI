const { pool } = require('../../../config/database');
const { logger } = require('../../../config/winston');
const mypickmoviesDao = require('../dao/mypickmoviesDao');

// 내가 찜한 영화 생성
exports.postmypickmovies = async function (req, res) {

    
    var user_num = req.params.user_num;
    var movie_id = req.params.movie_id;
    
    if (!user_num) {
        return res.json({ isSuccess: false, code: 306, message: "유저번호입력해주세요" });
    }
    if (!movie_id) {
        return res.json({ isSuccess: false, code: 301, message: "영화번호를 입력해주세요" });
    }
    try {//유저번호와 영화번호는 0보다 커야한다.
        if(user_num<=0 || movie_id<=0){
            return res.json({
                isSuccess: false,
                code: 309,
                message: "정확한 유저번호와영화번호를 입력해주세요."
            });
        }

        // 내가 찜한 영화  중복확인
        const  movie_id_rows = await mypickmoviesDao.movie_idCheck(movie_id);
        const user_num_rows = await mypickmoviesDao.user_numCheck(user_num);
        if (movie_id_rows.length > 0 && user_num_rows.length > 0) {
            return res.json({
                isSuccess: false,
                code: 309,
                message: " 중복된 생성 입니다."
            });
        }
        //내가 찜한 영화 생성
        const connection = await pool.getConnection(async (conn) => conn);
        

        const insertmypickmoviesRows = await mypickmoviesDao.insertmypickmovies(user_num,movie_id);
        

        if (insertmypickmoviesRows) {

            return res.json({
                isSuccess: true,
                code: 200,
                message: "내가 찜한 영화 생성",


            });

        }
        return res.json({
            isSuccess: false,
            code: 300,
            message: "내가 찜한 영화 생성 실패"
        });
    } catch (err) {

        logger.error(`App - SignUp Query error: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};

// 내가 찜한 영화 삭제
exports.deletemypickmovies = async function (req, res) {
    var user_num = req.params.user_num;
    var movie_id = req.params.movie_id;

    try {
        if(user_num<=0 || movie_id<=0){
            return res.json({
                isSuccess: false,
                code: 309,
                message: "정확한 유저번호와 프로그램 번호를 입력해주세요."
            });
        }
        const connection = await pool.getConnection(async (conn) => conn);
        const deletemypickmovies = await mypickmoviesDao.deletemypickmovies(user_num,movie_id);
        

        if (deletemypickmovies.affectedRows==0) {

            return res.json({
                isSuccess: true,
                code: 300,
                message: "좋아요평가한 프로그램이 존재하지 않습니다",
            });
        }
        else if (deletemypickmovies) {

            return res.json({
                isSuccess: true,
                code: 200,
                message: "좋아요평가한 프로그램삭제 성공",
            });
        }

        
    } catch (err) {

        logger.error(`App - SignUp Query error: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};
