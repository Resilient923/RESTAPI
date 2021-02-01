const { pool } = require("../../../config/database");

// 내가찜한목록조회
async function getmypicks(user_num) {
  const connection = await pool.getConnection(async (conn) => conn);
  const mypicksQuery = `
  select user_mypick.program_id as 'Contents_id' ,
       program_title        as 'Contents_title'   ,
       program_img             as 'Contents_img'
from user_mypick
         inner join program on user_mypick.program_id = program.program_id
         inner join user u on user_mypick.user_num = u.user_num
union
select user_mypick_movie.movie_id,
       movie_title,
       movie_img
from user_mypick_movie
         inner join movies on user_mypick_movie.movie_id = movies.movie_id
         inner join user u2 on user_mypick_movie.user_num = u2.user_num

where u2.user_num = '${user_num}'
;
                `;

  const mypicksparams = [user_num];
  const [mypicksrows] = await connection.query(
    mypicksQuery,
    mypicksparams


  );
  connection.release();

  return mypicksrows;
}
//////////////////////////////////////////////////////////////////////////프로필생성
//유저번호 중복체크
async function user_numCheck(user_num) {
  const connection = await pool.getConnection(async (conn) => conn);
  const user_num_Query = `
                SELECT user_num,program_id 
                FROM user_mypick
                WHERE user_num = ?;
                `;
  const user_num_Params = [user_num];
  const [user_num_rows] = await connection.query(
    user_num_Query,
    user_num_Params
  );
  connection.release();

  return user_num_rows;
}
//프로그램번호 중복체크
async function program_idCheck(program_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const program_id_Query = `
                SELECT user_num,program_id 
                FROM user_mypick
                WHERE program_id = ?;
                `;
  const program_id_Params = [program_id];
  const [program_id_rows] = await connection.query(
    program_id_Query,
    program_id_Params
  );
  connection.release();
  return program_id_rows;
} 
//내가 찜한 프로그램 생성 함수
async function insertmypickprograms(user_num,program_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const insertmypickprogramsQuery = `
        INSERT INTO user_mypick(user_num,program_id)
        VALUES ('${user_num}','${program_id}');
    `;
  const insertmypickprogramsRow = await connection.query(
    insertmypickprogramsQuery
   // insertevalprogramsParams 
  );
  connection.release();
  return insertmypickprogramsRow;
}
//////////////////////////////////////////////////////////////////////////////////
// 내가 찜한 프로그램  삭제
async function deletemypickprograms(user_num,program_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const deletemypickprogramsQuery = `
  DELETE FROM user_mypick where user_num = '${user_num}' and program_id = '${program_id}';
                `;

  const deletemypickprogramsParams = [user_num,program_id]

  const [deletemypickprogramsrows] = await connection.query(
    deletemypickprogramsQuery,
    deletemypickprogramsParams

  );
  connection.release();
  
  return deletemypickprogramsrows;
}
module.exports = {
  getmypicks,
  user_numCheck,
  program_idCheck,
  insertmypickprograms,
  deletemypickprograms
};

