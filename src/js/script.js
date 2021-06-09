{
  'use strict';

  const booksList = document.querySelector('.books-list');
  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  
  let favoriteBooks = [];
  let filters = [];
  const filterSection = document.querySelector('.filters');

  function render(){
        
    for(const books of dataSource.books){
      const ratingBgc = determineRatingBgc(books.rating);
      const ratingWidth = Math.round((books.rating * 100) / 10);
      const generatedHTML = template(books);
      const element = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(element);
    }
  }
  render();

  function initActions(){

    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      const id = event.target.offsetParent.getAttribute('data-id');

      if(!event.target.offsetParent.classList.contains('favorite')){
        favoriteBooks.push(id);
        event.target.offsetParent.classList.add('favorite');

      }else{
        favoriteBooks = favoriteBooks.filter(function(toRemove){
          return toRemove !== id;
        });
        event.target.offsetParent.classList.remove('favorite');
      }
    });
    filterSection.addEventListener('click', function(event){
      const id = event.target.value;

      if(event.target.checked){
        filters.push(id);
      }else{
        filters = filters.filter(function(toRemove){
          return toRemove !== id;
        });
      }
      filterBooks();
    });
  }
  initActions();
  
  function filterBooks(){
    for(const book of dataSource.books){
      let shouldBeHidden = false;
      const id = book.id;
      const bookClass = document.querySelector('.book__image[data-id="'+ id + '"]');

      for(const filter of filters){
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

  function determineRatingBgc(Rating){
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