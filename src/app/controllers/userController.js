const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');

const jwt = require('jsonwebtoken');
const regexEmail = require('regex-email');
const crypto = require('crypto');
const secret_config = require('../../../config/secret');

const userDao = require('../dao/userDao');
const { constants } = require('buffer');

/**
 update : 2020.10.4
 01.signUp API = 회원가입
 */
exports.signUp = async function (req, res) {
    const {
        email,name, password, phone,address,country
    } = req.body;
console.log(req.body)
    if (!email) return res.json({isSuccess: false, code: 301, message: "이메일을 입력해주세요."});
    if (email.length > 30) return res.json({
        isSuccess: false,
        code: 302,
        message: "이메일은 30자리 미만으로 입력해주세요."
    });

    if (!regexEmail.test(email)) return res.json({isSuccess: false, code: 303, message: "이메일을 형식을 정확하게 입력해주세요."});

    if (!password) return res.json({isSuccess: false, code: 304, message: "비밀번호를 입력 해주세요."});
    if (password.length < 6 || password.length > 20) return res.json({
        isSuccess: false,
        code: 305,
        message: "비밀번호는 6~20자리를 입력해주세요."
    });

    
        try {
            // 이메일 중복 확인
            const emailRows = await userDao.userEmailCheck(email);
            if (emailRows.length > 0) {

                return res.json({
                    isSuccess: false,
                    code: 308,
                    message: "중복된 이메일입니다."
                });
            }

            // 전화번호
            const phoneRows = await userDao.userphoneCheck(phone);
            if (phoneRows.length > 0) {
                return res.json({
                    isSuccess: false,
                    code: 309,
                    message: "중복된 전화번호입니다."
                });
            }

            // TRANSACTION : advanced
           // await connection.beginTransaction(); // START TRANSACTION
            const hashedPassword = await crypto.createHash('sha512').update(password).digest('hex');
            console.log(hashedPassword)
            const insertUserInfoParams = [email,name,hashedPassword, phone,address,country];
            
            const insertUserRows = await userDao.insertUserInfo(insertUserInfoParams);

          //  await connection.commit(); // COMMIT
           // connection.release();
            return res.json({
                isSuccess: true,
                code: 200,
                message: "회원가입 성공",
                data : insertUserInfoParams
            });
        } catch (err) {
           // await connection.rollback(); // ROLLBACK
           // connection.release();
            logger.error(`App - SignUp Query error\n: ${err.message}`);
            return res.status(500).send(`Error: ${err.message}`);
        }
};

/**
 update : 2020.10.4
 02.signIn API = 로그인
 **/
exports.signIn = async function (req, res) {
    const {
        email, password
    } = req.body;

    if (!email) return res.json({isSuccess: false, code: 301, message: "이메일을 입력해주세요."});
    if (email.length > 30) return res.json({
        isSuccess: false,
        code: 302,
        message: "이메일은 30자리 미만으로 입력해주세요."
    });

    if (!regexEmail.test(email)) return res.json({isSuccess: false, code: 303, message: "이메일을 형식을 정확하게 입력해주세요."});

    if (!password) return res.json({isSuccess: false, code: 304, message: "비밀번호를 입력 해주세요."});
        try {
            const [userInfoRows] = await userDao.selectUserInfo(email)

            if (userInfoRows.length < 1) {
             //   connection.release();
                return res.json({
                    isSuccess: false,
                    code: 310,
                    message: "아이디를 확인해주세요."
                });
            }
               
            
            const hashedPassword = await crypto.createHash('sha512').update(password).digest('hex');
            //console.log
            if (userInfoRows[0].password !== hashedPassword) {
               // connection.release();
                return res.json({
                    isSuccess: false,
                    code: 311,
                    message: "비밀번호를 확인해주세요."
                });
            }
            
            //토큰 생성
            let token = await jwt.sign({
                    id: userInfoRows[0].email,
                }, // 토큰의 내용(payload)
                secret_config.jwtsecret, // 비밀 키
                {
                    expiresIn: '365d',
                    subject: 'userInfo',
                } // 유효 시간은 365일
                
            );
           
                const inserttokenrows = await userDao.inserttoken(token);
                console.log(inserttokenrows)
                console.log(userInfoRows[0])
                if(inserttokenrows.insertId  == userInfoRows[0].user_num){
                    
                    return res.json({
                        isSuccess: true,
                        code: 201,
                        message: "토큰저장성공",
                        userInfo: userInfoRows[0].user_num,
                        jwt: token,
                        isSuccess: true,
                        code: 200,
                        message: "로그인 성공(토큰저장)"
                    });
                }else{
                   
                    return res.json({
                        
                        isSuccess: false,
                        code: 311,
                        message: "이미로그인 되어있습니다"
                    });
                }
           
        
            //connection.release();
        } catch (err) {
            logger.error(`App - SignIn Query error\n: ${JSON.stringify(err)}`);
            connection.release();
            return false;
        }
};

/**
 update : 2019.09.23
 03.check API = token 검증
 **/
exports.check = async function (req, res) {

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        
        var user_num = req.params.user_num;
        const getmypagerows = await userDao.mycheck(user_num);
        const checktokenRows = await userDao.checktoken(user_num);
        
        console.log(checktokenRows)
        
            if (checktokenRows.length>0) {

                return res.json({
                    isSuccess: true,
                    code: 200,
                    message: "토큰 검증 성공, 내정보 조회",
                    info: req.verifiedToken,
                    data : getmypagerows
                });
            }
            else{
            return res.json({
                isSuccess: false,
                code: 300,
                message: "내 정보 조회 실패 "
            });
        }
        } catch (err) {
           
            logger.error(`App - SignUp Query error: ${err.message}`);
            return res.status(500).send(`Error: ${err.message}`);
        }
    
        
    
};