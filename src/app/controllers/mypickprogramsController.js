const { pool } = require('../../../config/database');
const { logger } = require('../../../config/winston');
const mypickprogramsDao = require('../dao/mypickprogramsDao');

//내가찜한 콘텐츠 목록
exports.getmypicks = async function (req, res) {
    var id = req.params.user_num
    
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const mypicksrows = await mypickprogramsDao.getmypicks(id);

        if (mypicksrows) {

            return res.json({
                isSuccess: true,
                code: 200,
                message: " 유저가 찜한 콘텐츠 목록",
                data: mypicksrows

            });

        }
        return res.json({
            isSuccess: false,
            code: 300,
            message: "유저가 찜한 콘텐츠 목록 조회 실패"
        });
    } catch (err) {

        logger.error(`App - SignUp Query error: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};

// 내가 찜한 프로그램 생성
exports.postmypickprograms = async function (req, res) {

    
    var user_num = req.params.user_num;
    var program_id = req.params.program_id;
    
    if (!user_num) {
        return res.json({ isSuccess: false, code: 306, message: "유저번호입력해주세요" });
    }
    if (!program_id) {
        return res.json({ isSuccess: false, code: 301, message: "프로그램번호를 입력해주세요" });
    }
    try {//유저번호와 프로그램번호는 0보다 커야한다.
        if(user_num<=0 || program_id<=0){
            return res.json({
                isSuccess: false,
                code: 309,
                message: "정확한 유저번호와 프로그램 번호를 입력해주세요."
            });
        }

        // 내가 찜한 프로그램  중복확인
        const  program_id_rows = await mypickprogramsDao.program_idCheck(program_id);
        const user_num_rows = await mypickprogramsDao.user_numCheck(user_num);
        if (program_id_rows.length > 0 && user_num_rows.length > 0) {
            return res.json({
                isSuccess: false,
                code: 309,
                message: " 중복된 생성 입니다."
            });
        }
        //내가 찜한 프로그램 생성
        const connection = await pool.getConnection(async (conn) => conn);
        

        const insertmypickprogramsRows = await mypickprogramsDao.insertmypickprograms(user_num,program_id);
        

        if (insertmypickprogramsRows) {

            return res.json({
                isSuccess: true,
                code: 200,
                message: "유저가평가한좋아요프로그램 생성",


            });

        }
        return res.json({
            isSuccess: false,
            code: 300,
            message: "유저가평가한좋아요프로그램 생성 실패"
        });
    } catch (err) {

        logger.error(`App - SignUp Query error: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};

// 내가 찜한 프로그램 삭제
exports.deletemypickprograms = async function (req, res) {
    var user_num = req.params.user_num;
    var program_id = req.params.program_id;

    try {
        if(user_num<=0 || program_id<=0){
            return res.json({
                isSuccess: false,
                code: 309,
                message: "정확한 유저번호와 프로그램 번호를 입력해주세요."
            });
        }
        const connection = await pool.getConnection(async (conn) => conn);
        const deletemypickprograms = await mypickprogramsDao.deletemypickprograms(user_num,program_id);
        

        if (deletemypickprograms.affectedRows==0) {

            return res.json({
                isSuccess: true,
                code: 300,
                message: "좋아요평가한 프로그램이 존재하지 않습니다",
            });
        }
        else if (deletemypickprograms) {

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
