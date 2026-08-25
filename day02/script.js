const movie = {
  id: 1,
  title: "인셉션",
  voteAverage: 8.4,
  voteCount: 35000,
  releaseDate: "2010-07-15",
  isFavorite: false,
};

console.log(movie.title);
console.log(movie.voteAverage);
console.log(movie.isFavorite);

if (movie.voteAverage >= 8) {
  console.log("추천 영화");
} else {
  console.log("일반 영화");
}

if (movie.voteAverage >= 8 && movie.voteCount >= 30000) {
  console.log("인기 추천 영화");
} else {
  console.log("일반 영화");
}

const favoriteButtonText = movie.isFavorite === true ? "찜 해제" : "찜하기";
console.log(favoriteButtonText);

const movies = [
  { id: 1, title: "인셉션", voteAverage: 8.4, releaseDate: "2010-07-15" },
  { id: 2, title: "인터스텔라", voteAverage: 8.7, releaseDate: "2014-11-05" },
  { id: 3, title: "테넷", voteAverage: 7.3, releaseDate: "2020-08-26" },
];

console.log(movies[0].title);
console.log(movies[1].voteAverage);
console.log(movies[2].releaseDate);
console.log(movies.length);

movies[0].voteAverage = 8.5;
console.log(movies[0].voteAverage);

movies.push({
  id: 4,
  title: "다크 나이트",
  voteAverage: 9.0,
  releaseDate: "2008-07-16",
});
console.log(movies.length);
