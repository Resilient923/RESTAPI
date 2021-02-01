const { pool } = require("../../../config/database");

// Signup
async function userEmailCheck(email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectEmailQuery = `
                SELECT email, phone
                FROM user  
                WHERE email = ?;
                `;
  const selectEmailParams = [email];
  const [emailRows] = await connection.query(
    selectEmailQuery,
    selectEmailParams
  );
  connection.release();

  return emailRows;
}
//핸드폰번호 중복여부
async function userphoneCheck(phone) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectphoneQuery = `
                SELECT email, phone 
                FROM user 
                WHERE phone = ?;
                `;
  const selectphoneParams = [phone];
  const [phoneRows] = await connection.query(
    selectphoneQuery,
    selectphoneParams
  );
  connection.release();
  return phoneRows;
}
//회원가입기입정보
async function insertUserInfo(insertUserInfoParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const insertUserInfoQuery = `
        INSERT INTO user(email,name,password, 
          phone,address,country)
        VALUES (?,?,?,?,?,?);
    `;
    
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );
  connection.release();
  return insertUserInfoRow;
}

//login
async function selectUserInfo(email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectUserInfoQuery = `
                SELECT user_num, email, password
                FROM user
                WHERE email = ?;
                `;

  let selectUserInfoParams = [email];
  const [userInfoRows] = await connection.query(
    selectUserInfoQuery,
    selectUserInfoParams
  );
  return [userInfoRows];
}
//토큰 저장+ 로그인
async function inserttoken(token) {
  const connection = await pool.getConnection(async (conn) => conn);
  const  inserttokenQuery = `
            INSERT INTO token (token)
            VALUES (?);
                `;

  let  inserttokenParams = [token];
  const [ inserttokenRows] = await connection.query(
    inserttokenQuery,
    inserttokenParams
  );
  return  inserttokenRows;
}

//토큰 체크
async function checktoken(user_num) {
  const connection = await pool.getConnection(async (conn) => conn);
  const checktokenQuery = `
                select token FROM token 
                WHERE user_num = '${user_num}';
                `;
  //const checktokenParams = [user_num];
  const [checktokenRows] = await connection.query(
    checktokenQuery,
    //checktokenParams
  );
  connection.release();

  return checktokenRows;
}


//내정보조회
async function mycheck(user_num) {
  const connection = await pool.getConnection(async (conn) => conn);
  const  mypageQuery = `
                SELECT  *
                FROM user
                WHERE user_num = ${user_num};
                `;

  let  mypageParams = [user_num];
  const  [mypageRows] = await connection.query(
    mypageQuery,
    mypageParams
  );
  return  mypageRows;
}
//test
/* async function selectuser_num(user_email){
  const connection = await pool.getConnection(async (conn) => conn);
  const selectEmailQuery = `
  select user_num from user
  where email = '${email}';`;
  const [emailRows] = await connection.query(
    selectEmailQuery
  );
  connection.release();
  return emailRows;
}
async function selecttokenuser(user){
  const connection = await pool.getConnection(async (conn) => conn);
  constselecttokenQuery = `
  select* from token
  where user_num = '${user}';`;
  const [tokenRows] = await connection.query(
    selecttokenQuery
  );
  connection.release();
  return tokenRows;
} */




module.exports = {
  userEmailCheck,
  userphoneCheck,
  insertUserInfo,
  selectUserInfo,
  inserttoken,
  mycheck,
  checktoken,
  //selectuser_num,
  //selecttokenuser
};
