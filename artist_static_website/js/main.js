const grid = document.getElementById("workGrid");
const filters = document.querySelectorAll(".filter");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.querySelector(".close-lightbox");
const nextBtn = document.querySelector(".lightbox-arrow.next");
const prevBtn = document.querySelector(".lightbox-arrow.prev");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".top-nav");

let visibleArtworks = [];
let currentIndex = 0;

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

function renderWorks(filter = "all") {
  if (!grid || typeof artworks === "undefined") return;

  visibleArtworks = artworks.filter((art) => {
    return filter === "all" || art.year === filter || art.type === filter;
  });

  grid.innerHTML = visibleArtworks.map((art, index) => `
    <article class="work-card" data-index="${index}">
      <img src="${art.image}" alt="${art.title}" loading="lazy">
      <div class="work-info">
        <h2>${art.title}</h2>
        <p>${art.year} · ${formatType(art.type)}</p>
        <p>${art.medium}</p>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("click", () => openLightbox(Number(card.dataset.index)));
  });
}

function formatType(type) {
  return type.replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    renderWorks(button.dataset.filter);
  });
});

function openLightbox(index) {
  if (!lightbox) return;
  currentIndex = index;
  const art = visibleArtworks[currentIndex];
  lightboxImage.src = art.image;
  lightboxImage.alt = art.title;
  lightboxCaption.textContent = `${art.title} — ${art.year}, ${formatType(art.type)}`;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeImage() {
  if (!lightbox) return;
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.classList.remove("no-scroll");
}

function moveImage(direction) {
  if (!visibleArtworks.length) return;
  currentIndex = (currentIndex + direction + visibleArtworks.length) % visibleArtworks.length;
  openLightbox(currentIndex);
}

if (closeLightbox) closeLightbox.addEventListener("click", closeImage);
if (nextBtn) nextBtn.addEventListener("click", () => moveImage(1));
if (prevBtn) prevBtn.addEventListener("click", () => moveImage(-1));

document.addEventListener("keydown", (event) => {
  if (!lightbox || lightbox.getAttribute("aria-hidden") === "true") return;
  if (event.key === "Escape") closeImage();
  if (event.key === "ArrowRight") moveImage(1);
  if (event.key === "ArrowLeft") moveImage(-1);
});

renderWorks();
