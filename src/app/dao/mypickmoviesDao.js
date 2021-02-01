const { pool } = require("../../../config/database");


//유저번호 중복체크
async function user_numCheck(user_num) {
  const connection = await pool.getConnection(async (conn) => conn);
  const user_num_Query = `
                SELECT user_num,movie_id 
                FROM user_mypick_movie
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
//영화번호 중복체크
async function movie_idCheck(movie_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const movie_id_Query = `
                SELECT user_num,movie_id 
                FROM user_mypick_movie
                WHERE movie_id = ?;
                `;
  const movie_id_Params = [movie_id];
  const [movie_id_rows] = await connection.query(
    movie_id_Query,
    movie_id_Params
  );
  connection.release();
  return movie_id_rows;
} 
//내가 찜한 영화 생성 함수
async function insertmypickmovies(user_num,movie_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const insertmypickmoviesQuery = `
        INSERT INTO user_mypick_movie(user_num,movie_id)
        VALUES ('${user_num}','${movie_id}');
    `;
  const insertmypickmoviesRow = await connection.query(
    insertmypickmoviesQuery
   
  );
  connection.release();
  return insertmypickmoviesRow;
}
//////////////////////////////////////////////////////////////////////////////////
// 내가 찜한 영화  삭제
async function deletemypickmovies(user_num,movie_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const deletemypickmoviesQuery = `
  DELETE FROM user_mypick_movie where user_num = '${user_num}' and movie_id = '${movie_id}';
                `;

  const deletemypickmoviesParams = [user_num,movie_id]

  const [deletemypickmoviesrows] = await connection.query(
    deletemypickmoviesQuery,
    deletemypickmoviesParams

  );
  connection.release();
  
  return deletemypickmoviesrows;
}
module.exports = {
  user_numCheck,
  movie_idCheck,
  insertmypickmovies,
  deletemypickmovies
};

