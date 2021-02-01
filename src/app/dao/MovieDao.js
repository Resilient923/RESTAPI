const { pool } = require("../../../config/database");

/////////////////////////////////////////////////////////////////////////////////
// getmovies 영화 정보 가져오기
async function  movie(id) {
  const connection = await pool.getConnection(async (conn) => conn);
  
  const  movieQuery = `
  select movie_id                                               ,
  movie_preview                                                 ,
  movie_title                                                   ,
  audience_img                                                  ,
  quality_img                                                   ,
  date_format(movie_airdate, '%Y')                             as 'movie_airdate',
  concat(time_format(sec_to_time((movie_runtime)), '%k'), '시간 ',
         time_format(sec_to_time((movie_runtime)), '%i'), '분') as 'movie_runtime',
  movie_summary                                                ,

  concat('출연:', movie_cast)                                    as 'movie_cast',
  concat('감독:', movie_prod)                                    as 'movie_prod',
  case
      when exists(select * from user_eval_movie where movie_id = ${id})
          then '따봉'
      else '노따봉'
      end                                                      as '영화 평가'
from movies
    inner join quality_img on movies.quality = quality_img.quality
    inner join audience_img on movies.audience_rate = audience_img.audience_rate


where movie_id = '${id}';
                `;
  
  const [ movierows] = await connection.query(
    movieQuery
    
  );
  connection.release();

  return  movierows;
}
////////////////////////////////////////////////////////////////////////
// getmoviedetails 영화 정보 더보기 가져오기
async function  moviedetails(id) {
  const connection = await pool.getConnection(async (conn) => conn);
  
  const  moviedetailsQuery = `
  select Movie_id                ,
  Movie_title            ,
  Movie_prod              ,
  Movie_cast    ,
  Movie_genre  ,
  audience_img.audience_img 
from movies
    inner join audience_img on movies.audience_rate = audience_img.audience_rate

where movie_id = '${id}'
                `;
  const moviedetailsParams = [id];
  const [ moviedetailsrows] = await connection.query(
    moviedetailsQuery,
    moviedetailsParams
    
  );
  connection.release();

  return  moviedetailsrows;
}



////////////////////////////////////////////////////////////////////////////////////
// getwatch-movies 영화 시청
async function  watchmovie(id) {
  const connection = await pool.getConnection(async (conn) => conn);
  
  const  watchmovieQuery = `
            SELECT movie_id,movie_video FROM movies WHERE Movie_id = '${id}'
            
                `;
  
  const [ watchmovierows] = await connection.query(
    watchmovieQuery
    
  );
  connection.release();

  return  watchmovierows;
}



module.exports = {
  
  movie,
  moviedetails,
  watchmovie,
  
};

