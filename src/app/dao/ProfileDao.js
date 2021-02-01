const { pool } = require("../../../config/database");

// 프로필조회
async function getprofile() {
  const connection = await pool.getConnection(async (conn) => conn);
  const profileQuery = `
  select * from Profile order by profile_id;

                `;


  const [profilerows] = await connection.query(
    profileQuery,


  );
  connection.release();

  return profilerows;
}
//////////////////////////////////////////////////////////////////////////프로필생성

//프로필 번호를 체크하는 함수
async function profile_idCheck(profile_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const profile_id_Query = `
                SELECT profile_id,profile_name 
                FROM Profile 
                WHERE profile_id = ?;
                `;
  const profile_id_Params = [profile_id];
  const [profile_id_rows] = await connection.query(
    profile_id_Query,
    profile_id_Params
  );
  connection.release();

  return profile_id_rows;
}
//프로필 이름을 체크하는 함수
async function profile_nameCheck(profile_name) {
  const connection = await pool.getConnection(async (conn) => conn);
  const profile_name_Query = `
                SELECT profile_id,profile_name 
                FROM Profile 
                WHERE profile_name = ?;
                `;
  const profile_name_Params = [profile_name];
  const [profile_name_rows] = await connection.query(
    profile_name_Query,
    profile_name_Params
  );
  connection.release();
  return profile_name_rows;
}
//프로필 생성하는 함수
async function insertprofile(insertprofileParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const insertprofileQuery = `
        INSERT INTO Profile(profile_id,profile_name)
        VALUES (?, ?);
    `;
  const insertprofileRow = await connection.query(
    insertprofileQuery, //내가 설정한 쿼리를 insertprofileRow에서 쓸수있도록 해준다.
    insertprofileParams //받아오는 값을 insertprofileRow에서 쓸수있도록 해준다.
  );
  connection.release();
  return insertprofileRow;
}
////////////////////////////////////////////////////////////////////////////////
// 프로필 이름 수정
async function patchprofile(profile_id,profile_name) {
  const connection = await pool.getConnection(async (conn) => conn);
  const patchprofileQuery = `
        
  update Profile set profile_name = '${profile_name}' where profile_id = '${profile_id}';

    `;
  const patchprofileParams = [profile_id];
  const patchprofileRow = await connection.query(
    patchprofileQuery, //내가 설정한 쿼리를 patchprofileRow에서 쓸수있도록 해준다.
    patchprofileParams //받아오는 값을 insertprofileRow에서 쓸수있도록 해준다.
  );
  connection.release();
  return patchprofileRow;
}

//////////////////////////////////////////////////////////////////////////////////
// 프로필삭제
async function deleteprofile(profile_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const deleteprofileQuery = `
  delete from Profile where profile_id = '${profile_id}';
                `;

  const deleteprofileParams = [profile_id]

  const [deleteprofilerows] = await connection.query(
    deleteprofileQuery,
    deleteprofileParams

  );
  connection.release();

  return deleteprofilerows;
}


module.exports = {
  getprofile,
  profile_idCheck,
  profile_nameCheck,
  insertprofile,
  deleteprofile,
  patchprofile
};

