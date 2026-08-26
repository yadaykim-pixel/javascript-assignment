
// 02. 버튼의 Click Event 처리하기
// ==========================================
const recommendButton = document.querySelector("#recommend-button");
const recommendResult = document.querySelector("#recommend-result");

recommendButton.addEventListener("click", () => {
  recommendResult.textContent = "오늘의 추천 영화는 인셉션입니다.";
});


// 03 ~ 05. Form 제출 처리 및 빈 검색어/입력창 초기화
// ==========================================
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchResult = document.querySelector("#search-result");

searchForm.addEventListener("submit", (event) => {
  // 03. 페이지 새로고침 방지
  event.preventDefault();

  // 04. 앞뒤 공백 제거 및 빈 검색어 처리 (선택 요구사항)
  const keyword = searchInput.value.trim();
  if (keyword === "") {
    searchResult.textContent = "";
    return;
  }

  // 03. 입력한 영화 제목 화면에 표시
  searchResult.textContent = `검색한 영화: ${keyword}`;

  // 05. 검색 후 Input 비우기
  searchInput.value = "";
});


// 06 ~ 07. 영화 목록 데이터 및 화면/콘솔 출력
// ==========================================
const movies = [
  {
    title: "인셉션",
    voteAverage: 8.4,
  },
  {
    title: "인터스텔라",
    voteAverage: 8.7,
  },
  {
    title: "다크 나이트",
    voteAverage: 9.0,
  },
];

// 06. forEach()로 영화 목록 Console 출력
movies.forEach((movie) => {
  console.log(`${movie.title}의 평점은 ${movie.voteAverage}점입니다.`);
});

// 07. 영화 목록을 화면(DOM)에 출력하기
const movieList = document.querySelector("#movie-list");

movies.forEach((movie) => {
  const li = document.createElement("li");
  li.textContent = movie.title;
  movieList.append(li);
});
