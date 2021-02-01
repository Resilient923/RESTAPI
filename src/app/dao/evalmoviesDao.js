const { pool } = require("../../../config/database");

// 좋아요평가한프로그램조회
async function getevalmovies(user_num) {
  const connection = await pool.getConnection(async (conn) => conn);
  const evalmoviesQuery = `
  select user_num, movie_id from user_eval_movie where user_num = ${user_num};

                `;

  const evalmoviesparams = [user_num];
  const [evalmoviesrows] = await connection.query(
    evalmoviesQuery,
    evalmoviesparams


  );
  connection.release();

  return evalmoviesrows;
}
//////////////////////////////////////////////////////////////////////////프로필생성

//유저 번호를 체크하는 함수
async function user_numCheck(user_num) {
  const connection = await pool.getConnection(async (conn) => conn);
  const user_num_Query = `
                SELECT * 
                FROM user_eval_movie
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
//영화번호을 체크하는 함수
async function movie_idCheck(movie_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const movie_id_Query = `
                select user_num, Movie_id from user_eval_movie where movie_id = ?;
                `;
  const movie_id_Params = [movie_id];
  const [movie_id_rows] = await connection.query(
    movie_id_Query,
    movie_id_Params
  );
  connection.release();
  return movie_id_rows;
}
//유저가 좋아요 평가한 영화 생성 함수
async function insertevalmovies(user_num, movie_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const insertevalmoviesQuery = `
        INSERT INTO user_eval_movie(user_num, movie_id)
        VALUES ('${user_num}','${movie_id}');
    `;
  const insertevalmoviesRow = await connection.query(
    insertevalmoviesQuery
    // insertevalprogramsParams 
  );
  connection.release();
  return insertevalmoviesRow;
}
//////////////////////////////////////////////////////////////////////////////////
// 좋아요평가 영화 삭제
async function deleteevalmovies(user_num, movie_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const deleteevalmoviesQuery = `
  DELETE FROM user_eval_movie where user_num = '${user_num}' and movie_id = '${movie_id}';
                `;

  const deleteevalmoviesParams = [user_num, movie_id]

  const [deleteevalmoviesrows] = await connection.query(
    deleteevalmoviesQuery,
    deleteevalmoviesParams

  );
  connection.release();

  return deleteevalmoviesrows;
}
module.exports = {
  getevalmovies,
  user_numCheck,
  movie_idCheck,
  insertevalmovies,
  deleteevalmovies
};

