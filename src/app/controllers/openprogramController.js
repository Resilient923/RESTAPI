const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');
const openprogramDao = require('../dao/openprogramDao');

//공개예정 프로그램
exports.getopenprograms = async function (req, res) {
    try {
        
       
        const openprogramrows = await openprogramDao.getopenprogram();
            if (openprogramrows) {

                return res.json({
                    isSuccess: true,
                    code: 200,
                    message: "공개예정화면",
                    openprograms: openprogramrows
                });
            }
            return res.json({
                isSuccess: false,
                code: 300,
                message: "공개예정화면 조회실패 "
            });
        } catch (err) {
           
            logger.error(`App - SignUp Query error: ${err.message}`);
            return res.status(500).send(`Error: ${err.message}`);
        }
};

