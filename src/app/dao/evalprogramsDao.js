const { pool } = require("../../../config/database");

// 좋아요평가한프로그램조회
async function getevalprograms(user_num) {
  const connection = await pool.getConnection(async (conn) => conn);
  const evalprogramsQuery = `
  select user_num, program_id from user_eval_program where user_num = ${user_num};

                `;

  const evalprogramsparams = [user_num];
  const [evalprogramsrows] = await connection.query(
    evalprogramsQuery,
    evalprogramsparams


  );
  connection.release();

  return evalprogramsrows;
}
//////////////////////////////////////////////////////////////////////////프로필생성

 //유저 번호를 체크하는 함수
async function user_numCheck(user_num) {
  const connection = await pool.getConnection(async (conn) => conn);
  const user_num_Query = `
                SELECT user_num,program_id 
                FROM user_eval_program
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
//프로그램번호을 체크하는 함수
async function program_idCheck(program_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const program_id_Query = `
                SELECT user_num,program_id 
                FROM user_eval_program
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
//유저가 좋아요 평가한 프로그램 생성 함수
async function insertevalprograms(user_num,program_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const insertevalprogramsQuery = `
        INSERT INTO user_eval_program(user_num,program_id)
        VALUES ('${user_num}','${program_id}');
    `;
  const insertevalprogramsRow = await connection.query(
    insertevalprogramsQuery
   // insertevalprogramsParams 
  );
  connection.release();
  return insertevalprogramsRow;
}
//////////////////////////////////////////////////////////////////////////////////
// 좋아요평가 영화 삭제
async function deleteevalprograms(user_num,program_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const deleteevalprogramsQuery = `
  DELETE FROM user_eval_program where user_num = '${user_num}' and program_id = '${program_id}';
                `;

  const deleteevalprogramsParams = [user_num,program_id]

  const [deleteevalprogramsrows] = await connection.query(
    deleteevalprogramsQuery,
    deleteevalprogramsParams

  );
  connection.release();
  
  return deleteevalprogramsrows;
}
module.exports = {
  getevalprograms,
  user_numCheck,
  program_idCheck,
  insertevalprograms,
  deleteevalprograms
};

