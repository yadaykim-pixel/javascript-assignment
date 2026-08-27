const title = "인터스텔라"; //영화 제목
const voteAverage = 8.7; //평균 평점
const voteCount = 32000; //평가 수
const popularity = 150.5; //인기도 점수
const releaseDate = "2014-11-05"; //개봉일
const originalLanguage = "en"; //원어

console.log(title);
console.log(voteAverage);
console.log(voteCount);
console.log(popularity);
console.log(releaseDate);
console.log(originalLanguage);

const additionalVoteCount = 100;
console.log(voteCount + additionalVoteCount);

const genre = "SF";
const category = "영화";
console.log(genre + " " + category);

console.log("영화 제목: " + title);
console.log("평점: " + voteAverage);
console.log("개봉일: " + releaseDate);

console.log(`영화 제목: ${title}`);
console.log(`평점: ${voteAverage}`);
console.log(`개봉일: ${releaseDate}`);

console.log(`${title}는 ${releaseDate}에 개봉한 영화이며, 현재 평점은 ${voteAverage}점이고 ${voteCount}명이 평가하였습니다.`);


