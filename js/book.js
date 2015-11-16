(function(root){

  'use strict';

  root.Book = function(book, addReview) {
    // Book class to hold a passed in json representation of the book
    this.title = book.title; 
    this.author = book.author;
    this.image = book.image;
    this.addReview = addReview;
    this.rating = book.rating || 0;
    this.section = document.createElement('section');

  };

  Book.prototype.render = function() {
    // Builds up book component and 
    // returns book section 
    this.section.className = 'card book cf';
    // Render image in own div 
    this._renderImage();
    // Create wrapper div for book text and pass those to 
    // children componenets 
    var bookText = document.createElement('div');
    bookText.className = 'book__text';
    this.section.appendChild(bookText);
    this._renderContent(bookText);
    this._renderButtons(bookText);
    return this.section;
  };


  Book.prototype._renderImage = function() {
    // Create image container to hold book image
    var bookImage = document.createElement('div');
    bookImage.className = 'book__image cf';
    var img = document.createElement('img');
    img.src = this.image;
    bookImage.appendChild(img);
    this.section.appendChild(bookImage);
  };

  Book.prototype._renderContent = function(parent) {
    // Create a container div that hold book information 
    // and book's buttons
    var content = document.createElement('div');
    content.className = 'content'

    // render title and author 
    this._renderTitle(content);
    this._renderAuthor(content);
    this._renderAvgRating(content);
    parent.appendChild(content);

  };

  Book.prototype._renderTitle = function(parent) {
    var title = document.createElement('h1');
    title.innerHTML = this.title;
    parent.appendChild(title);
  };

  Book.prototype._renderAuthor = function(parent) {
    var author = document.createElement('h2');
    author.innerHTML = 'By ' + this.author;
    author.className = 'sub_title';
    parent.appendChild(author);
  };

  Book.prototype._renderAvgRating = function(parent) {
    var avgRating = new root.StarRating({ readOnly: true, rating: this.rating })
    parent.appendChild(avgRating.render());
  }

  Book.prototype._renderButtons = function(parent) {
    var button_container = document.createElement('div');
    button_container.className = 'buttons'; 
    var sample = document.createElement('a');
    sample.innerHTML = 'Free Sample';
    var review = document.createElement('a');
    review.innerHTML = 'Review';
    review.addEventListener('click', this._handeReviewClick.bind(this));
    // Add buttons to container and container to parent
    button_container.appendChild(sample);
    button_container.appendChild(review);
    parent.appendChild(button_container);
  };

  Book.prototype._handeReviewClick = function() {
    var reviewForm = new ReviewForm(this.addReview);
    // Only add form if there isn't already a form
    if (!this.section.querySelector('.review-form')) {
      this.section.appendChild(reviewForm.render());      
    }
  };
  Book.prototype.sectionContainer = function() {
    // return section for easy swapping when reviews are updated
    return this.section;
  };
  
})(this)








