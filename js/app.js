(function(root){
  'use strict';

  root.App = function(parent, data) {
    // Store data as instance variables so 
    // they can be easily modified by App level functions that will be 
    // called by submit actions of nested components
    this.data = data
    this.parent = parent;
  };

  App.prototype.render = function() {
    // Create two columns that will stack for response design
    this.left = document.createElement('div');
    this.left.className = 'left';
    this.right = document.createElement('div');
    this.right.className = 'right';
    // Render each individual section of the app
    this._renderNavBar();
    this._renderWelcome();
    this._renderBooks();
    this._renderArticles();
    this.parent.appendChild(this.left);
    this.parent.appendChild(this.right);
  };

  App.prototype._renderNavBar = function() {
    // Map title of books and articles to array to generate new Navbar
    // Store as an instance variable for easy access when adding 
    // new books to the page
    this.titles = [];
    this.data.books.forEach(function(book){
      this.titles.push(book.title);
    }.bind(this));

    this.data.articles.forEach(function(article){
      this.titles.push(article.title);
    }.bind(this));
    // Render new navbar based on titles of passed in data
    // and save as an instance variable for easy replacement 
    // when new data is added
    this.navBar = new root.NavBar(this.titles);
    this.parent.appendChild(this.navBar.render());
  };

  App.prototype._renderWelcome = function() {
    this.welcome = 
      new root.Welcome(this._addBook.bind(this));
      this.leftw.appendChild(this.welcome.render());
  };

  App.prototype._renderBooks = function() {
    // Create new book component for each book at 
    // add it to parent
    this.data.books.forEach(function(book){
      var newBook = new root.Book(book, this._addReview.bind(this, book));
      this.left.appendChild(newBook.render());
    }.bind(this))
  };
  // Takes two arguments, the book to be added and the form to be removed from the DOM
  App.prototype._addBook = function(newBook, form) {
    // Check if the newbook exists in the current data set
    // If it does not, proceed, else, alet the user it exists
    if (this.titles.indexOf(newBook.title) === -1) {
      // Remove the welcome componenet from the DOM 
      this.parent.removeChild(form);
      // Create a new book componenet from the newBook json object
      var newBook = new root.Book(newBook);
      // Add new book to the stored json array of books 
      this.books.push(newBook);
      // Add new title to the titles array for the navBar 
      this.titles.push(newBook.title);
      // Add book component to the parent div of the application
      this.left.appendChild(newBook.render())
      this._updateNav();
    } else {
      alert("You can't add the same book twice!");
    }
  };


  App.prototype._renderArticles = function() {
    // Iterate through articles and append them to the DOM
    this.data.articles.forEach(function(article){
      var newArticle = new root.Article(article);
      this.right.appendChild(newArticle.render());
    }.bind(this))
  };

  App.prototype._addReview = function(book, newReview) {
    // Add new review to the binded book object 
    var oldTotal = book.rating * book.reviews.length;
    book.reviews.push(newReview);

    book.rating = (oldTotal + newReview.rating) / book.reviews.length;
    this._updateBooks();
  };

  App.prototype._updateBooks = function() {
    // Find all books on the DOM 
    var books = this.parent.querySelectorAll('.book');
    // Use Array.prototype.slice to make books node list into an 
    // array to be able to iterate over the nodes and remove
    [].slice.apply(books).forEach(function(book){
      book.parentNode.removeChild(book);
    });
    // Re add each node with the updated data
    this._renderBooks();
  };

  App.prototype._updateNav = function() {
    // Create new nav bar with the updated titles
    var newNav = new root.NavBar(this.titles);
    // Repace the current nav bar with the updated one 
    var nav = this.navBar.sectionContainer();
    nav.parentNode.replaceChild(newNav.render(), nav);
    // Reassign the pointer to the new nav bar objectå
    this.navBar = newNav;
  }

})(this)