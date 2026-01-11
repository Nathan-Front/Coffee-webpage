
function coffeeSelector(){
    const clickedCoffee = document.querySelectorAll(".coffee-selections");
    clickedCoffee.forEach((e) => {
        e.addEventListener("click", () => {
            document.querySelector(".currentSelected").classList.remove("currentSelected");
            e.classList.add("currentSelected");
            
        });
    });

    document.querySelectorAll("button[data-target]").forEach(ev => {
    ev.addEventListener("click", () => {
    document.querySelectorAll(".coffee-selection-text").forEach(section => {
      section.style.display = "none";
      section.classList.remove("selectedCoffee");
    });

    const target = document.getElementById(ev.dataset.target);
    target.style.display = "flex";
    target.classList.add("selectedCoffee");
    adjustImagesByTextHeight(); 
  });
});
}

function adjustImagesByTextHeight() {
  const block = document.querySelector(".coffee-selection-text.selectedCoffee");
  if (!block) return;
  const p = block.querySelector("p");
  const images = block.querySelectorAll(".coffee-images");
  if (!p || !images.length) return;
  const textHeight = p.scrollHeight; 
  images.forEach(img => {
     img.style.height = "";
  if (textHeight > 140 ) {
    img.style.height = "clamp(130px, 15vw, 200px)";
  }
   else if (textHeight > 80) {
      img.style.height = "clamp(160px, 18vw, 320px)";
  } 
  });
}
coffeeSelector();


//Testimony slider
const carouselWrapper = document.querySelector('.customer-testimony-container');
const slides = document.querySelectorAll('.customer-testimony');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const visibleSlides = 3; //Initial slider display 
let currentIndex = 0;
let slideWidth;

function updateSlideWidth() {
  slideWidth = slides[0].offsetWidth + 20; //Includes the space between each sliders
}

function updateCarousel() {
  carouselWrapper.style.transform =
    `translateX(${-currentIndex * slideWidth}px)`;
  
  updateActiveDot();
}

window.addEventListener('resize', updateSlideWidth);

const maxIndex = slides.length - visibleSlides;

nextBtn.addEventListener('click', () => {
  if (currentIndex >= maxIndex) {
    currentIndex = 0; //Go back to start
  } else {
    currentIndex++;
  }
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex <= 0) {
    currentIndex = maxIndex; //Go to end
  } else {
    currentIndex--;
  }
  updateCarousel();
});

const dotsContainer = document.querySelector(".slider-dots");
const totalDots = slides.length - visibleSlides + 1;

function createDots(){
  dotsContainer.innerHTML = "";

  for ( let i = 0; i < totalDots; i++ ) {
    const dot = document.createElement("button");

    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
      //updateActiveDot();
    });
    dotsContainer.appendChild(dot);
  }
 updateActiveDot();
}

function updateActiveDot(){
  const dots = dotsContainer.querySelectorAll("button");

  dots.forEach((dot, index) =>{
    dot.classList.toggle("active", index === currentIndex);
  })
}

window.addEventListener('load', () => {
  updateSlideWidth();
  updateCarousel();
  createDots();
});




