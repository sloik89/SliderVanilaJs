const api_key = "e7d8c200732f7635e93b0412ed464d6e";
const url = `https://api.themoviedb.org/3/authentication`;
let scrollAmount = 0;

const Btns = document.querySelectorAll(".sliderButton");
const sliders = document.querySelector(".carouselbox");
let images;
let scroll = 0;

async function showMovie() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2Q4YzIwMDczMmY3NjM1ZTkzYjA0MTJlZDQ2NGQ2ZSIsInN1YiI6IjVmNzk4MzgwZmRmYzlmMDAzNmE4YmVjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AmDkyPppAcyL1Zfh7uezJF2Y7z0dWYudZ1f7HsJBaBU",
    },
  };
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie/",
      options
    );
    console.log(data);
    const res = await data.json();
    console.log(res);
    const slicedRes = res.results.slice(0, 20);
    renderMovies(slicedRes);
  } catch (err) {
    console.log(err);
  }
}
function renderMovies(results) {
  results.map((item, idx) => {
    sliders.insertAdjacentHTML(
      "beforeend",
      `<img class="img-${idx} slider-img" src="https://image.tmdb.org/t/p/w154/${item.poster_path}" />`
    );
  });

  initSlider();
}
showMovie();
const initSlider = () => {
  const imageList = document.querySelector(".carouselbox");
  imagesLenght = document.querySelectorAll(".slider-img").length;
  images = document.querySelectorAll(".slider-img");

  Btns.forEach((elem) => {
    elem.addEventListener("click", () => {
      const direction = elem.classList.contains("switchLeft") ? -1 : 1;

      const scrollTo = (imageList.clientWidth * direction) / 2;

      // clientWidth return wdith of vissible content
      // scrollWith return wdith of whole content
      const sizeOfOneImg = scrollTo / imagesLenght;

      console.log(imageList.scrollWidth - imageList.clientWidth);

      console.log(imageList.scrollWidth);
      imageList.scrollBy({ left: scrollTo, behavior: "smooth" });
    });
  });
  const handleSlideBtns = () => {
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    Btns[0].style.display = imageList.scrollLeft <= 20 ? "none" : "block";
    Btns[1].style.display =
      imageList.scrollLeft >= maxScrollLeft - 20 ? "none" : "block";
    console.log(imageList.scrollLeft);
    console.log(maxScrollLeft - 100);
  };
  sliders.addEventListener("scroll", () => {
    handleSlideBtns();
  });
};
