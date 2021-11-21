import axios from 'axios';

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

   async fetchImages() {
        const BASE_URL = 'https://pixabay.com';
        const KEY = '24345533-951d6b0bcd0a023b92b061ad5';
        const getImg = await axios.get(`${BASE_URL}/api/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
        this.incrementPage();
        
        return getImg;
          }   


    resetPage() {
        this.page = 1;
    }

    incrementPage() {
        this.page += 1;
    }

    decrementPage() {
        this.page -= 1;
    }
    
    // get query () {
    //     return this.searchQuery;
    // }

    // set query (newQuery) {
    //     this.searchQuery = newQuery;
    // }

}
