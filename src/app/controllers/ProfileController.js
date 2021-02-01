const { pool } = require('../../../config/database');
const { logger } = require('../../../config/winston');
const ProfileDao = require('../dao/ProfileDao');

//프로필 조회
exports.getprofile = async function (req, res) {

    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const programdetailsrows = await ProfileDao.getprofile();

        if (programdetailsrows) {

            return res.json({
                isSuccess: true,
                code: 200,
                message: "프로필 조회",
                data: programdetailsrows

            });

        }
        return res.json({
            isSuccess: false,
            code: 300,
            message: "프로필 조회 실패"
        });
    } catch (err) {

        logger.error(`App - SignUp Query error: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};

//프로필생성
exports.postprofile = async function (req, res) {

    const { profile_name } = req.body
    var profile_id = req.params.profile_id
    
    
    if (!profile_id) {
        return res.json({ isSuccess: false, code: 301, message: "프로필번호를 입력해주세요" });
    }
    if (profile_id > 5) return res.json({
        isSuccess: false,
        code: 302,
        message: "프로필은 최대 5개입니다."
    });
    if (!profile_name) {
        return res.json({ isSuccess: false, code: 306, message: "프로필이름을입력해주세요" });
    }
    if (profile_name.length > 20) return res.json({
        isSuccess: false,
        code: 307,
        message: "프로필이름은 최대 10자입니다."
    });

    try {
        //프로필번호 중복 확인
        const profile_id_rows = await ProfileDao.profile_idCheck(profile_id);
        if (profile_id_rows.length > 0) {

            return res.json({
                isSuccess: false,
                code: 308,
                message: "중복된 프로필번호입니다."
            });
        }

        // 프로필 이름 중복확인
        const profile_name_rows = await ProfileDao.profile_nameCheck(profile_name);
        
        if (profile_name_rows.length > 0) {
            return res.json({
                isSuccess: false,
                code: 309,
                message: "중복된 프로필이름입니다."
            });
        }
        //프로필 생성
        const connection = await pool.getConnection(async (conn) => conn);
        const profileParams = [profile_id, profile_name];

        const profileRows = await ProfileDao.insertprofile(profileParams);
        

        if (profileRows) {

            return res.json({
                isSuccess: true,
                code: 200,
                message: "프로필생성 성공",


            });

        }
        return res.json({
            isSuccess: false,
            code: 300,
            message: "프로필 생성 실패"
        });
    } catch (err) {

        logger.error(`App - SignUp Query error: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};

//프로필 삭제
exports.deleteprofile = async function (req, res) {
    var id = req.params.profile_id;
   
    

   if (!id) {
    return res.json({ isSuccess: false, code: 301, message: "프로필번호를 입력해주세요" });
}
   
    try { 
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteprofiles = await ProfileDao.deleteprofile(id);
        

        if (deleteprofiles.affectedRows == 1) {

            return res.json({
                isSuccess: true,
                code: 200,
                message: "프로필 삭제 성공",

 
            });
        }
        else if (deleteprofiles.affectedRows == 0) {

            return res.json({
                isSuccess: true,
                code: 300,
                message: "프로필 삭제 실패",
            });
        }

        /* return res.json({
            isSuccess: false,
            code: 300,
            message: "프로필 삭제 실패"
        }); */
    } catch (err) {

        logger.error(`App - SignUp Query error: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};

//프로필수정
exports.patchprofiles = async function (req, res) {
    const {profile_name} = req.body;
    const profile_id = req.params.profile_id;
    
    if (!profile_id) {
        return res.json({ isSuccess: false, code: 301, message: "프로필번호를 입력해주세요" });
    }
    if (profile_id > 5) return res.json({
        isSuccess: false,
        code: 302,
        message: "프로필은 최대 5개입니다."
    });
    if (!profile_name) {
        return res.json({ isSuccess: false, code: 306, message: "프로필이름을입력해주세요" });
    }
    if (profile_name.length > 20) return res.json({
        isSuccess: false,
        code: 307,
        message: "프로필이름은 최대 10자입니다."
    });


    try { 

        // 프로필 이름 중복확인
        const profile_name_rows = await ProfileDao.profile_nameCheck(profile_id,profile_name);
        
        if (profile_name_rows.length > 0) {
            return res.json({
                isSuccess: false,
                code: 309,
                message: "중복된 프로필이름입니다."
            });
        }

        const connection = await pool.getConnection(async (conn) => conn);
        //const profileParams = [profile_id, profile_name];
        const patchprofiles = await ProfileDao.patchprofile(profile_id, profile_name);
        
        console.log(patchprofiles);

        if (patchprofiles[0].affectedRows==1) {

            return res.json({
                isSuccess: true,
                code: 200,
                message: "프로필 수정 성공",

 
            });
        }
        else {

            return res.json({
                isSuccess: true,
                code: 300,
                message: "프로필 수정 실패",
            });
        }

        /* return res.json({
            isSuccess: false,
            code: 300,
            message: "프로필 삭제 실패"
        }); */
    } catch (err) {

        logger.error(`App - SignUp Query error: ${err.message}`);
        return res.status(500).send(`Error: ${err.message}`);
    }
};

