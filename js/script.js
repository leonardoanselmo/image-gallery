const imagesWrapper = document.querySelector(".images");

const apiKey = "ehuyNDywyPTfCCzcSYTN3OOcGf3vkNC9aY218uFDB0joUq7E5dbOCRb5";
const perPage = 15;
let currentPage = 1;

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
  fetch(apiURL, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      generateHTML(data.photos);
    });
};

getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);
