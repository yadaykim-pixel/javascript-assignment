// 02. JavaScript 객체 만들기
const movie = {
  id: 101,
  title: "Inception",
  voteAverage: 8.4,
  isAdult: false,
};
console.log(movie);

// 03. JavaScript 객체를 JSON 문자열로 변환하기
const movieJson = JSON.stringify(movie);
console.log(movieJson);
console.log(typeof movieJson);

// 04. JSON 문자열을 JavaScript 값으로 변환하기
const parsedMovie = JSON.parse(movieJson);

console.log(parsedMovie);
console.log(typeof parsedMovie);


