{
  'use strict';


  class BooksList{

    constructor(){
      this.getElements();
      this.initData();
      this.initActions();
      this.determineRatingBgc();
    }

    initData(){
      const thisData = this;
      thisData.data = dataSource.books;

      for(const books of thisData.data){
        books.ratingBgc = this.determineRatingBgc(books.rating);
        books.ratingWidth = Math.round((books.rating * 100) / 10);
        const generatedHTML = thisData.template(books);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisData.booksList.appendChild(element);
      }
    }

    getElements(){
      const thisElem = this;
      
      thisElem.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
      thisElem.booksList = document.querySelector('.books-list');
      thisElem.filterSection = document.querySelector('.filters');
      thisElem.favoriteBooks = [];
      thisElem.filters = [];
    }

    filterBooks(){
      for(const book of this.data){
        let shouldBeHidden = false;
        const id = book.id;
        const bookClass = document.querySelector('.book__image[data-id="'+ id + '"]');
  
        for(const filter of this.filters){
          if(book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden == true){
          bookClass.classList.add('hidden');
  
        } else if(shouldBeHidden == false){
          bookClass.classList.remove('hidden');
        }
      }
    }

    initActions(){
      const thisAction = this;
      thisAction.booksList.addEventListener('click', function(event){event.preventDefault();});// strona się skrolowała, więc dodałem te linię kodu
      thisAction.booksList.addEventListener('dblclick', function(event){
        event.preventDefault();
        const id = event.target.offsetParent.getAttribute('data-id');
  
        if(!event.target.offsetParent.classList.contains('favorite')){
          thisAction.favoriteBooks.push(id);
          event.target.offsetParent.classList.add('favorite');
  
        }else{
          thisAction.favoriteBooks = thisAction.favoriteBooks.filter(function(toRemove){
            return toRemove !== id;
          });
          event.target.offsetParent.classList.remove('favorite');
        }
      });
      thisAction.filterSection.addEventListener('click', function(event){
        const id = event.target.value;
  
        if(event.target.checked){
          thisAction.filters.push(id);
        }else{
          thisAction.filters = thisAction.filters.filter(function(toRemove){
            return toRemove !== id;
          });
        }
        thisAction.filterBooks();
      });
    }

   determineRatingBgc(Rating){
    const rating = {
      ratingOne: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);',
      ratingTwo: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);',
      ratingThree: 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);',
      ratingFour: 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);',
    };

    if(Rating < 6){
      return rating.ratingOne;

    } else if(Rating > 6 && Rating <= 8){
      return rating.ratingTwo;
      
    }else if(Rating > 8 && Rating <= 9){
      return rating.ratingThree;

    }else if(Rating > 9){
      return rating.ratingFour;
    }
    }
  }
  const app = new BooksList();
}