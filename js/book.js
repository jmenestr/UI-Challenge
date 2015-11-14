(function(root){

  'use strict';

  root.Book = function(book) {
    // Book class to hold a passed in json representation of the book
    this.title = book.title; 
    this.author = book.author;
    this.image = book.image;
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

  Book.prototype._renderButtons = function(parent) {
    var btns = new Buttons('Free Sample', 'Review');
    parent.appendChild(btns._render());
  };
})(this)

book = { 
  title: "Dogs!",
  author: "justin",
  image: "http://www.graphics20.com/wp-content/uploads/2012/12/Funny-Dog-34.jpg"
}






