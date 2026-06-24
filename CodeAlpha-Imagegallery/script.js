const images = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");

const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentIndex = 0;
let visibleImages = [];

/* OPEN IMAGE */
images.forEach((img) => {

    img.addEventListener("click", () => {

        visibleImages = [...document.querySelectorAll(".gallery img:not([style*='display: none'])")];

        currentIndex = visibleImages.indexOf(img);

        openLightbox();
    });

});

function openLightbox(){
    lightbox.style.display = "flex";
    showImage();
}

function showImage(){
    lightboxImg.src = visibleImages[currentIndex].src;
}

/* CLOSE */
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

/* NEXT */
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % visibleImages.length;
    showImage();
});

/* PREV */
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    showImage();
});

/* BACKDROP CLOSE */
lightbox.addEventListener("click", (e) => {
    if(e.target === lightbox){
        lightbox.style.display = "none";
    }
});

/* KEYBOARD */
document.addEventListener("keydown",(e)=>{
    if(lightbox.style.display==="flex"){
        if(e.key==="ArrowRight") nextBtn.click();
        if(e.key==="ArrowLeft") prevBtn.click();
        if(e.key==="Escape") lightbox.style.display="none";
    }
});

/* FILTER SYSTEM */
filterBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{

        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        images.forEach(img=>{
            img.style.display =
            (filter==="all" || img.classList.contains(filter))
            ? "block"
            : "none";
        });

    });
});