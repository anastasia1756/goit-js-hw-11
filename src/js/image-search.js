import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesApiService from './fetch-images';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    searchBtn: document.querySelector('.search-form > button'),
    searchForm: document.querySelector('.search-form'),
    imagesContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    body: document.querySelector('body'),
}
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault();
    imagesApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
    imagesApiService.resetPage();
    
const good = await imagesApiService.fetchImages();
const totalHits = good.data.totalHits;  
const hitsLength = good.data.hits.length;  
  
        if(totalHits < 1) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
    else if(imagesApiService.searchQuery === '') {
        Notify.warning('Enter your serch query, please :)');
        return;
    }
    else {
      refs.body.style.background = "#ffffff"
    Notify.success(`Hooray! We found ${totalHits} images.`);
    clearImagesContainer();
    
    imagesApiService.resetPage();
    renderPosts(good);
    
    
    
    
    
    showBtnLoadMore();
    refs.loadMoreBtn.removeAttribute('disabled');
    
    if (hitsLength < 40) {
        hideBtnLoadMore();
        Notify.info("We're sorry, but you've reached the end of search results.");
    }
    }
    }

;

async function onLoadMore() {
    
    // if (imagesApiService.page  !== 2) {
    //     imagesApiService.decrementPage();
    // };
    if (imagesApiService.page  === 1) {
      imagesApiService.incrementPage();
  };
//   if (imagesApiService.page  > 2) {
//     imagesApiService.decrementPage();
// };
    
    // imagesApiService.fetchImages().then(renderPosts);
    const good = await imagesApiService.fetchImages();
    
    renderPosts(good) 
    const hitsLength = good.data.hits.length;  
    if (hitsLength < 40) {
        hideBtnLoadMore();
        Notify.info("We're sorry, but you've reached the end of search results.");
    }

    const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2 + 50,
    behavior: 'smooth',
  });

}

function renderPosts(getImg) {
        const markup = 
        getImg.data.hits
    .map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) => {
        return `<a class="gallery__link" href="${largeImageURL}"><div class="photo-card">
            
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="392" height="264"/>
            
            <div class="info">
              <p class="info-item">
                <b>Likes <span class="nums"> ${likes} </span></b>
              </p>
              <p class="info-item">
                <b>Views <span class="nums"> ${views} </span></b>
              </p>
              <p class="info-item">
                <b>Comments <span class="nums"> ${comments} </span></b>
              </p>
              <p class="info-item">
                <b>Downloads <span class="nums"> ${downloads} </span></b>
              </p>
            </div>
          </div></a>`;
          })
          .join("");
          refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
          let gallery = new SimpleLightbox('.gallery a');
          gallery.refresh();
          showBtnLoadMore();
    }
    
function clearImagesContainer() {
    refs.imagesContainer.innerHTML = ''; 
}

function hideBtnLoadMore() {
    refs.loadMoreBtn.classList.add('is-hidden');
}

function showBtnLoadMore() {
    refs.loadMoreBtn.classList.remove('is-hidden');
}

