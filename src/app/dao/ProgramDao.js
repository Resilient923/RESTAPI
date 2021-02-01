const { pool } = require("../../../config/database");

//getprogram TV프로그램 정보
async function  program(id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const programQuery = `
  select program.program_id                 ,
  program_title                      ,
  program_preview                   ,
  program_img                        ,

  date_format(program_airdate, '%Y') ,
  audience_img                       ,
  quality_img                        ,
  concat('시즌', user_play_log.program_season, ':', user_play_log.episode_id, '화', '   ', user_play_log.episode_id,
         '화')                        as 'episode',
  concat('남은시간 :',
         (time_format(sec_to_time(program_episodes.episode_time), '%i분') -
          time_format(sec_to_time(user_play_log.episode_time), '%i분'))
      , '분')                         as ' Remainingtime',
  program_summary                     ,
  concat('제작자 :', program_prod)      as 'program_prod',
  concat('출연진 :', program_cast)      as 'program_cast',
  case
      when exists(select *
                  from user_eval_program
                  where program_id = ${id}
                    and user_eval_program.user_num = ${id})
          then '따봉'
      else '노따봉'
      end                      as 'good/bad'      
from program
    inner join user_play_log
    inner join program_episodes on user_play_log.episode_id = program_episodes.episode_id

    inner join (select program.program_id, program.quality, quality_img, audience_img
                from program
                         inner join quality_img on program.quality = quality_img.quality
                         inner join audience_img ai on program.audience_rate = ai.audience_rate) as quality
               on program.program_id = quality.program_id

where program.program_id = ${id}
                `;
                
  const programParams = [id];
  const [programrows] = await connection.query(
  programQuery,
   programParams
  );
  connection.release();
    
  return [programrows];
}
////////////////////////////////////////////////////////////////////////////
// getprogrameinfo TV프로그램정보 더보기정보
async function  programdetails(id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const programdetailsQuery = `
  select program_id                ,
  program_title             ,
  program_prod              ,
  program_cast              ,
  program_genre             ,
  audience_img.audience_img 
from program
    inner join audience_img on program.audience_rate = audience_img.audience_rate

where program_id = '${id}';

                `;
                
  const programdetailsParams = [id]
  const [programdetailsrows] = await connection.query(
  programdetailsQuery,
  programdetailsParams
  
  );
  connection.release();
    
  return programdetailsrows;
}
/////////////////////////////////////////////////////////////////////////////////////
//getprogramepisode TV프로그램 회차 정보
async function  programepisode(id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const programepisodeQuery = `
  select program_preview                                                            ,
  concat('시즌 ', season.program_season)                                       as 'program_season',
  concat(program_episodes.episode_id, '.', program_episodes.episode_id, '화') as 'episode_num',
  concat(time_format(sec_to_time(program_episodes.episode_time), '%i'), '분') as 'episode_runtime',
  program_episodes.episode_summary                                           ,
  program_episodes.episode_video                                             ,
  program_episodes.episode_poster                                            
from program_episodes
    inner join (select program_preview,
                       program_seasons.program_season,
                       episode_id
                from program
                         inner join program_seasons
                                    on program.program_id = program_seasons.program_id
                         inner join program_episodes) as season
               on program_episodes.episode_id = season.episode_id
where program_episodes.program_season = ${id}
order by season.episode_id
                `;
                
  //const selectprogramepisodeParams = [episodeid];
  const [programepisoderows] = await connection.query(
    programepisodeQuery,
  
  );
  connection.release();
    
  return programepisoderows;
}
////////////////////////////////////////////////////////////////////////////////////
// getwatchprogram TV프로그램 시청
async function  watchprogram(id) {
  const connection = await pool.getConnection(async (conn) => conn);
  
  const  watchprogramQuery = `
            select episode_id, episode_video from program_episodes where episode_id = '${id}'
            
                `;
  
  const [ watchprogramrows] = await connection.query(
    watchprogramQuery
    
  );
  connection.release();

  return  watchprogramrows;
}
module.exports = {
 
  program,
  programdetails,
  programepisode,
  watchprogram,
  
};

