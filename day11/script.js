const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

// TV 프로그램 API URL 정의
const SEARCH_URL_BASE = "https://api.themoviedb.org/3/search/tv";
const POPULAR_URL =
  "https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1";

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const container = document.querySelector("#tv-list");
const resultInfo = document.querySelector("#result-info");

// TV 카드 생성 함수 (기본 제공)
function createTVCard(tv) {
  const { name, vote_average, poster_path } = tv;

  const card = document.createElement("div");
  card.className = "tv-card";

  const poster = document.createElement("img");
  poster.src = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://placehold.co/500x750?text=No+Image";
  poster.alt = `${name} 포스터`;

  const titleEl = document.createElement("h3");
  titleEl.textContent = name;

  const rating = document.createElement("p");
  rating.textContent = `평점 ${vote_average}`;

  card.append(poster, titleEl, rating);

  return card;
}

// 화면에 TV 프로그램 목록을 그리는 함수 (기본 제공)
function renderTVShows(tvShows) {
  container.textContent = "";
  tvShows.forEach((tv) => {
    const card = createTVCard(tv);
    container.append(card);
  });
}

// [초기 실행] 인기 TV 프로그램 가져오기
async function getPopularTVShows() {
  container.innerHTML = "Loading...";

  try {
    const response = await fetch(POPULAR_URL, options);

    if (!response.ok) {
      throw new Error(`HTTP 오류: 상태 코드 ${response.status}`);
    }

    const data = await response.json();

    if (data.results.length === 0) {
      container.textContent = "인기 TV 프로그램 목록이 없습니다.";
      return;
    }

    renderTVShows(data.results);
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    container.innerHTML = "TV 프로그램 정보를 불러오지 못했습니다.";
  }
}

// 폼 제출 이벤트 리스너
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const keyword = input.value.trim();

  // 검색 기능 실행
  await searchTVShows(keyword);
});

// [과제 메인] 검색 기능 함수
async function searchTVShows(keyword) {
  if (resultInfo) {
    resultInfo.textContent = "";
  }

  // 요구사항 03: 빈 검색어 처리
  if (!keyword) {
    return;
  }

  try {
    // 요구사항 04: 검색어 인코딩 및 URL 생성
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `${SEARCH_URL_BASE}?query=${encodedKeyword}&language=ko-KR&page=1`;

    // 요구사항 05: fetch 요청
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP 오류: 상태 코드 ${response.status}`);
    }

    const data = await response.json();

    // 콘솔에서 검색 결과 확인
    console.log(data.results);

    // 요구사항 06: 기존 목록 비우기
    container.textContent = "";

    // 요구사항 07: 검색 결과가 없을 때 처리
    if (data.results.length === 0) {
      container.textContent = "검색 결과가 없습니다.";
      return;
    }

    // 요구사항 08: 검색 결과 화면에 표시
    renderTVShows(data.results);
  } catch (error) {
    console.error("TV 프로그램 검색 중 오류 발생:", error);
    container.innerHTML = "TV 프로그램 정보를 불러오지 못했습니다.";
  }
}

// 초기 로딩 시 인기 프로그램 출력 실행
getPopularTVShows();

