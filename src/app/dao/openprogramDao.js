const { pool } = require("../../../config/database");


// 공개예정 프로그램
async function  getopenprogram() {
  const connection = await pool.getConnection(async (conn) => conn);
  
  const  openprogramQuery = `
  select if(program_airdate < now(),
  null, concat(date_format(program_airdate, '%c'), '월 ', date_format(program_airdate, '%e'), '일 공개')) as 'airdate',
program_preview                                                                                        ,
program_summary                                                                                        ,
program_genre                                                                                          ,
program_title                                                                                          ,

case
   when exists(select *
               from program_alert
               where program_id = 8
                 and program_alert.user_num = 1)
       then '알림설정함'
   else '알림설정안함'
   end                                                                                                as 'alert'
from program
 inner join program_alert on program.program_id = program_alert.program_id
order by program_airdate;
            
                `;
  
  const [openprogramrows] = await connection.query(
    openprogramQuery
    
  );
  connection.release();

  return  openprogramrows;
}



module.exports = {
  
 
  getopenprogram
  
};

