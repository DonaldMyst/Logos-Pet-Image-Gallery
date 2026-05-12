let scrollContainer = document.querySelector(".container");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");

let images = document.querySelectorAll(".container img");
let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightboxImg");
let closeBtn = document.querySelector(".close");
let counter = document.getElementById("counter");

let currentIndex = 0;

const scrollAmount = 900;

//Update button states
function updateButtons(){
    //at start
    if(scrollContainer.scrollLeft <= 0){
        backBtn.classList.add("disabled");
    } else{
        backBtn.classList.remove("disabled");
    }

    //at end
    if(scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 5){
        nextBtn.classList.add("disabled");
    } else{
        nextBtn.classList.remove("disabled");
    }
}

function updateCounter(){
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

nextBtn.addEventListener("click", ()=> {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft += scrollAmount;
});

backBtn.addEventListener("click", ()=> {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft -= scrollAmount;
});

scrollContainer.addEventListener("wheel",(evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
    scrollContainer.style.scrollBehavior = "auto";
});

//Open lightbox
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        currentIndex = index;
        updateCounter();
    });
});

//close lightbox
function closeLightbox(){
    lightbox.style.display = "none";
}

closeBtn.addEventListener("click", closeLightbox);

//close when clicking outside image
lightbox.addEventListener("click", (e) => {
    if(e.target === lightbox){
        closeLightbox();
    }
});

//Keyboard navigation
document.addEventListener("keydown", (e) => {
    if(document.activeElement.tagName === "INPUT") return;
    
    if(lightbox.style.display === "flex"){
        if(e.key === "Escape"){
            closeLightbox();
        }

        if(e.key === "ArrowRight"){
            if(currentIndex < images.length - 1){
                currentIndex++;
            }
            lightboxImg.src = images[currentIndex].src;
            updateCounter();
        }

        if(e.key === "ArrowLeft"){
            if(currentIndex > 0){
                currentIndex--;
            }
            lightboxImg.src = images[currentIndex].src;
            updateCounter();
        }
        
        return;
    }

    if(e.key === "ArrowRight"){
        scrollContainer.scrollLeft += scrollAmount;
    }
    if(e.key === "ArrowLeft"){
        scrollContainer.scrollLeft -= scrollAmount;
    }
});

//Update buttons on scroll
scrollContainer.addEventListener("scroll", updateButtons);

//initial state
updateButtons();