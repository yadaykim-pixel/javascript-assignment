// 02. 
const getMovieMessage = (title, voteAverage) => {
  return `${title}의 평점은 ${voteAverage}점입니다.`;
};


// 03. 
const message = getMovieMessage("인셉션", 8.4);

console.log(message);


// 04. 
const title = document.querySelector(".title");

title.textContent = "오늘의 추천 영화";


// 05. 
const description = document.querySelector(".description");

description.classList.add("text-primary", "fw-bold");


// 06. 
const movieList = document.querySelector("#movie-list");

const movieElement = document.createElement("div");

movieElement.textContent = message;

movieElement.classList.add("border", "rounded", "p-3", "mb-2");

movieList.append(movieElement);


// 07. 
const message2 = getMovieMessage("인터스텔라", 8.7);

const movieElement2 = document.createElement("div");

movieElement2.textContent = message2;

movieElement2.classList.add("border", "rounded", "p-3", "mb-2");

movieList.append(movieElement2);


// 08. 
//movieElement2.remove();

