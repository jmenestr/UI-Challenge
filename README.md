# UI Design Challenge 
UI Design Challenge using no third party JS libaries 

Component Tree 
<pre>
App
|
|--Navbar
|    
|
|--Welcome Message 
|    |
|    |-- Book Form
|
|--Book 
|    |
|    |--Reivew Form
|            |
|            |-- Star Rating
|
|
|--Article
</pre>

## Design Overview 

### App Component
* Handles the rendering of all subcomponents as outlined in the tree above

```javascript 
  ...
  // Renders the entire app by delegating to helper functions to render each component of the app
  // 
  App.prototype.render = function() {
  ...
    this._renderNavBar();
    this._renderWelcome();
    this._renderBooks();
    this._renderArticles();
  }
  ... 
```
* Handles data level validation (such as checking for dupcliates) by keeping 
* data check as close to where data is being stored

```javascript 
App.prototype._addBook = function(newBook, form) {
    // Check for book duplicates with a simple title check
    if (this.titles.indexOf(newBook.title) === -1) {
     ....
    } else {
      alert("You can't add the same book twice!");
    }
  };
```

* Handles the logic for adding new reviews and books to the DOM

```javascript
  // Handles DOM manipulation of data level modfications 
    App.prototype._addReview = function(book, newReview) {
    // Adds new Review to the book object and then updates the DOM with the new books
    ...
    book.reviews.push(newReview);
    ...
    this._updateBooks();
  };
  
  App.prototype._updateBooks = function() {
    // Update book finds all books, clears them from the DOM, then rerenders new books with 
    // updated data
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
    ... 
    // Replaces old nav bar with new  nav bar with updated titles
    nav.parentNode.replaceChild(newNav.render(), nav);
    // Reassign the pointer to the new nav bar objectå
    this.navBar = newNav;
  }

```
*  Passes DOM manipulation callbacks to handle form submission by binding correct object. 
   This prevents a liner time look up of the correct book object when _addReview  is called to 
   update the review

```javascript

  App.prototype._renderBooks = function() {
    this.data.books.forEach(function(book){
      var newBook = new root.Book(book, this._addReview.bind(this, book));
      this.left.appendChild(newBook.render());
    }.bind(this))
  };
```

#Forms
* Forms handle form level validation such as checking for empty fields

```javascript
BookForm.prototype._isFormValid = function() {
    // Grap the title and author fields 
    ...
    var valid = true;
    //Check for a non-empty string and returns false if not valid as well as 
    // assiging error class for correct highlighthing 
    if (title.value.trim() == '') {
      title.className = 'error';
      valid = false;
    } else {
      title.className = '';
    }
    if (author.value.trim() == '') {
      ....
    } else {
      ...
    }

    // Also checks to see if file field is empty
    if (!file.files[0]) {
      file.className = 'error';
      valid = false;
    } else {
      file.className = '';
    }
    return valid;

  }
```
* For case of local storage and no database, handles file upload by converting to base64 string and 
storing in localStorage, then setting attribute from local storage when creating new object

```javascript 
BookForm.prototype._handleUpload = function() {
   ...
    if (input.files && input.files[0]) {
      // Creae a new FileReader that will read file and 
      // convert it to base64 string
      var reader = new FileReader();
      // Truncate file name so it dosen't overflow storage string limit
      this.fileName = 'upload'

      reader.onload = function (e) {
        // Store locally so it can be set as the url image in a new book object
        try {
          localStorage.setItem(this.fileName, e.target.result);     
        } catch(e) {
          alert("Something went wrong while saving the file to local storate. Please try again");
        }
      }.bind(this)
      // Read data is base64 string
      reader.readAsDataURL(input.files[0]);
    }
  };
```
#Star Rating 

* Use options/defaults hash to allow for customization of score, max score, and readOnly/Interactive modes 

```javascript 

  root.StarRating = function(opts, clickHandler) {
    // Options takes a rating, a max number of stars, 
    // and a readOnly flag
    defaults = {
      readOnly: true,
      rating: 3,
      max: 5
    };
    this._handleClick = clickHandler;
    // merge options hash with defaults 
    for (var property in opts) {
        defaults[property] = opts[property]    
      }
  ...
  };

```

* Add click handler for interactive method by using a bind time argument to remember the iteration step (and hence the rating) of the correct star and delegate this to a handler that sets the rating in
the parent form. 

```javascript 

    StarRating.prototype._renderInteractive = function() {
    // Iterate up to the max rating 
    for (var i = 1; i <= this.max; i++) {
      // Create a custom clickhandler binded to the correct rating for each star
      var clickHandler = this._handleClick.bind(this, i);

      if (i <= this.rating) {
        // Add in full stars up to the rating
        ...
      } else {
        // Fill in the rest with empty stars
        ...
      }
    }
  };

```  

