const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

const url = "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR";

async function getNowPlaying() {
  // 03. fetch()로 서버에 Request 보내기
  const response = await fetch(url, options);

  // 04. Response의 데이터 사용하기
  const data = await response.json();

  // 05. 첫 번째 영화 가져오기
  const firstMovie = data.results[0];

  // 06. 영화 제목과 평점 가져오기
  const { title, vote_average } = firstMovie;

  // 결과 출력
  console.log(`제목: ${title}`);
  console.log(`평점: ${vote_average}`);
}

getNowPlaying();
