const {pool} = require('../../../config/database');
const {logger} = require('../../../config/winston');
const ProgramDao = require('../dao/ProgramDao');

      
//TV프로그램 정보 조회
exports.getprogram = async function (req, res) {
   
    try {
        var id = req.params.id;
        const program = await ProgramDao. program(id);
          
            if (program) {
                
                return res.json({
                    isSuccess: true,
                    code: 200,
                    message: "TV프로그램정보조회성공",
                    
                    program : program
                });
               
            }
            return res.json({
                isSuccess: false,
                code: 300,
                message: "TV프로그램정보조회없음"
            });
        } catch (err) {
           
            logger.error(`App - SignUp Query error: ${err.message}`);
            return res.status(500).send(`Error: ${err.message}`);
        }
};
//TV프로그램 정보 더보기 조회
exports.getprogramdetails = async function (req, res) {
   
    try {
        var id =req.params.id
        const programdetailsrows = await ProgramDao.programdetails(id);
          
            if (programdetailsrows) {
                
                return res.json({
                    isSuccess: true,
                    code: 200,
                    message: "TV프로그램정보더보기",
                    
                    programinfo : programdetailsrows
                });
               
            }
            return res.json({
                isSuccess: false,
                code: 300,
                message: "TV프로그램정보더보기실패"
            });
        } catch (err) {
           
            logger.error(`App - SignUp Query error: ${err.message}`);
            return res.status(500).send(`Error: ${err.message}`);
        }
};
//TV프로그램 회차정보
exports.getprogramepisode= async function (req, res) {
   
    try {
        var id = req.params.id;
        
        const programepisoderows = await ProgramDao.programepisode(id);
          
            if (programepisoderows) {
                
                return res.json({
                    isSuccess: true,
                    code: 200,
                    message: "TV프로그램 시즌"+(id)+" 회차 조회",
                    
                    programepisode : programepisoderows
                });
               
            }
            return res.json({
                isSuccess: false,
                code: 300,
                message: "TV프로그램 시즌"+(id)+" 회차 조회 실패"
            });
        } catch (err) {
           
            logger.error(`App - SignUp Query error: ${err.message}`);
            return res.status(500).send(`Error: ${err.message}`);
        }
};
//TV프로그램 시청
exports.getwatchprogram = async function (req, res) {
    try {
        
        var id = req.params.id;
        const watchprogramrows = await ProgramDao.watchprogram(id);
            if (watchprogramrows) {

                return res.json({
                    isSuccess: true,
                    code: 200,
                    message: (id)+"화 시청",
                    watchprogram: watchprogramrows
                });
            }
            return res.json({
                isSuccess: false,
                code: 300,
                message: (id)+"화 시청 실패"
            });
        } catch (err) {
           
            logger.error(`App - SignUp Query error: ${err.message}`);
            return res.status(500).send(`Error: ${err.message}`);
        }
};
