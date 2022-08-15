const figure_container = document.querySelector(".figure_container");
const figure_image = document.querySelector(".figure_image");
const rec_lens = document.querySelector(".rec-lens");
const all_thumbnails = document.querySelectorAll(".thumbnail");
const zoom_container = document.querySelector(".zoom_container");

let picture_active = 0;

// Functions

function handleChangeImageThumbnail(thumbnail, index) {
  figure_image.setAttribute('src', thumbnail.getAttribute('src'));
  all_thumbnails[picture_active].classList.remove('img-active');
  thumbnail.classList.add('img-active');
  picture_active = index;
}

function getMousePositionForLens(e) {
  let x = e.offsetX - rec_lens.offsetWidth / 2;
  let y = e.offsetY - rec_lens.offsetHeight / 2;

  const minX = 0;
  const minY = 0;
  const maxX = (figure_container.offsetWidth - rec_lens.offsetWidth);
  const maxY = (figure_container.offsetHeight - rec_lens.offsetHeight);

  // Chech Horizontal boundaries.
  if (x <= minX) {
    x = minX;
  } else if (x >= maxX) {
    x = maxX;
  } 
  
  // Check Vertical boundaries. 
  if (y <= minY) {
    y = minY;
  } else if (y >= maxY) {
    y = maxY
  }

  return {x, y};
}

function handleZoomLensPosition(e) {
  const {x, y} = getMousePositionForLens(e);

  rec_lens.style.left = x + 'px';
  rec_lens.style.top = y + 'px';

  const fractionX = zoom_container.offsetWidth / rec_lens.offsetWidth;
  const fractionY = zoom_container.offsetHeight / rec_lens.offsetHeight;
  
  zoom_container.style.backgroundPosition = `-${x * fractionX}px -${y * fractionY}px`;
  zoom_container.style.backgroundSize  = `${figure_image.offsetWidth * fractionX}px ${figure_image.offsetHeight * fractionY}px`;
}

function handleZoomLensActivation() {
  rec_lens.classList.add('rec-lens_active');
  zoom_container.classList.add('rec-lens_active');
  zoom_container.style.backgroundImage  = `url(${figure_image.src})`;
}

function handleZoomLensDeactivation() {
  rec_lens.classList.remove('rec-lens_active');
  zoom_container.classList.remove('rec-lens_active');
}

// Event Listeners

window.addEventListener('load', () => {
  figure_image.setAttribute('src', all_thumbnails[picture_active].getAttribute('src'));
  all_thumbnails[picture_active].classList.add('img-active');
});

all_thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('mouseover', () => {handleChangeImageThumbnail(thumbnail, index)});
}); 

figure_image.addEventListener('mousemove', handleZoomLensPosition);
figure_image.addEventListener('mouseover', handleZoomLensActivation);
figure_image.addEventListener('mouseout', handleZoomLensDeactivation);
