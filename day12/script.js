const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

const NOW_PLAYING_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1";

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const container = document.querySelector("#movie-list");
const keywordList = document.querySelector("#keyword-list");
const clearButton = document.querySelector("#clear-keywords"); // 삭제 버튼 요소
const savedKeywords = localStorage.getItem("keywords");

// --- 영화 데이터 로딩 및 렌더링 함수 ---

function createMovieCard(movie) {
  const { title, vote_average, poster_path } = movie;

  const card = document.createElement("div");
  card.className = "movie-card";

  const poster = document.createElement("img");
  poster.src = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://placehold.co/500x750?text=No+Image";
  poster.alt = `${title} 포스터`;

  const titleEl = document.createElement("h3");
  titleEl.textContent = title;

  const rating = document.createElement("p");
  rating.textContent = `평점 ${vote_average}`;

  card.append(poster, titleEl, rating);

  return card;
}

function renderMovies(movies) {
  container.textContent = ""; // 새로운 검색 결과가 로드되면 이전 목록을 초기화
  movies.forEach((movie) => {
    container.append(createMovieCard(movie));
  });
}

async function getNowPlayingMovies() {
  container.textContent = "영화 목록을 불러오는 중...";
  try {
    const response = await fetch(NOW_PLAYING_URL, options);

    if (!response.ok) {
      container.textContent = "정보를 불러오지 못했습니다.";
      return;
    }

    const data = await response.json();

    renderMovies(data.results);
  } catch (error) {
    container.textContent = "정보를 불러오지 못했습니다.";
    console.error(error);
  }
}

async function searchMovies(keyword) {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedKeyword}&language=ko-KR&page=1`;
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`요청 실패 (Status: ${response.status})`);
    }

    const data = await response.json();

    if (data.results.length === 0) {
      container.textContent = "검색 결과가 없습니다.";
      return;
    }

    renderMovies(data.results);
  } catch (error) {
    console.error(error);
    container.textContent = "검색 중 문제가 발생했습니다.";
  }
}


// --- localStorage 및 키워드 관리 함수 ---

const RECENT_KEYWORDS_STORAGE_KEY = "keywords";

/**
 * 최근 검색 기록을 localStorage에서 불러옵니다.
 * @returns {string[]} 저장된 키워드 배열
 */
function getRecentKeywords() {
    const history = localStorage.getItem(RECENT_KEYWORDS_STORAGE_KEY);
    return history ? JSON.parse(history) : [];
}

/**
 * 최근 검색 기록을 localStorage에 저장합니다.
 * @param {string[]} keywords - 저장할 키워드 배열
 */
function saveRecentKeywords(keywords) {
    localStorage.setItem(RECENT_KEYWORDS_STORAGE_KEY, JSON.stringify(keywords));
}

/**
 * 화면에 최근 검색어 목록을 렌더링합니다.
 */
function renderKeywords() {
    const keywords = getRecentKeywords();
    keywordList.textContent = ""; // 목록 초기화

    if (keywords.length === 0) {
        keywordList.textContent = "최근 검색 기록이 없습니다.";
        return;
    }

    keywords.forEach((keyword) => {
        const item = document.createElement("li");
        item.className = "keyword-item";
        
        // 키워드 텍스트 표시
        const keywordSpan = document.createElement("span");
        keywordSpan.textContent = keyword;
        keywordSpan.classList.add("keyword-text");
        item.appendChild(keywordSpan);

        const removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.textContent = "X";

        // 삭제 이벤트 리스너 연결
        removeButton.addEventListener("click", () => {
            handleRemoveKeyword(keyword);
        });

        item.append(removeButton);
        keywordList.append(item);
    });
}

/**
 * 특정 키워드를 목록에서 제거하고 저장하는 함수.
 * @param {string} keyword - 제거할 키워드
 */
function handleRemoveKeyword(keyword) {
    let keywords = getRecentKeywords();
    
    // 필터링: 해당 키워드를 제외한 새로운 배열 생성
    const updatedKeywords = keywords.filter((k) => k !== keyword); 

    // 변경된 배열을 저장하고 화면을 업데이트합니다.
    saveRecentKeywords(updatedKeywords);
    renderKeywords();
}


// --- 이벤트 리스너 및 초기화 ---

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const keyword = input.value.trim();
  if (!keyword) return;

  // 1. 검색어 저장 및 중복 최신화 로직
  let keywords = getRecentKeywords();
  
  // 기존 배열에서 같은 키워드를 먼저 제거한 후 맨 앞에 추가
  keywords = keywords.filter((k) => k !== keyword);
  keywords.unshift(keyword);
  
  // 변경된 배열 저장
  saveRecentKeywords(keywords);

  // 화면 업데이트 (검색 직후 목록 표시)
  renderKeywords();

  input.value = ""; // 검색창 비우기

  // 2. 실제 영화 검색 실행
  await searchMovies(keyword);
});

// 초기 데이터 로드 및 시작
window.onload = () => {
    // 페이지 로드 시 저장된 목록을 불러와 표시합니다.
    renderKeywords();
};

getNowPlayingMovies();
