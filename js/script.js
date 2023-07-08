const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");

const apiKey = "ehuyNDywyPTfCCzcSYTN3OOcGf3vkNC9aY218uFDB0joUq7E5dbOCRb5";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const generateHTML = (images) => {
  imagesWrapper.innerHTML += images.map(
    (img) =>
      `<li class="card">
          <img src="${img.src.large2x}" alt="img">
          <div class="details">
          <div class="photographer">
            <i class="uil uil-camera"></i>
            <span>${img.photographer}</span>
          </div>
          <button><i class="uil uil-import"></i></button>
          </div>
      </li>`
  ).join("");
};

const getImages = (apiURL) => {
  loadMoreBtn.innerText = "Carregando...";
  loadMoreBtn.classList.add("disabled");
  fetch(apiURL, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      generateHTML(data.photos);
      loadMoreBtn.innerText = "+ imagens";
      loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Falha ao carregar imagens!"));
};

const loadMoreImages = () => {
  currentPage++;
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiURL;
  getImages(apiURL);
}

const loadSearchImages = (e) => {
  if(e.target.value === "") return searchTerm = null; 
  if(e.key === "Enter") {
    currentPage = 1;
    searchTerm = e.target.value;
    imagesWrapper.innerHTML = "";
    getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
  }
}


getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);