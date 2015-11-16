(function(root){
  'use strict';
  root.BookForm = function(addBook) {
    this.section = document.createElement('section');
    this.section.className = 'book-form card';
    this.addBook = addBook;
  };

  BookForm.prototype.render = function() {
    var form = document.createElement('form');
    this._createField(form, { 
      id: "title", 
      label: "Enter book title",
      type: "text"
      });
    this._createField(form, { 
      id: "author", 
      label: "Enter author's name",
      type: "text"
      });
    this._createField(form, { 
      id: "book-cover", 
      label: "Upload book cover",
      type: "file"
      });
    var submit = document.createElement('input');
    submit.setAttribute('type','submit');
    submit.setAttribute('value','Add book');
    form.appendChild(submit);
    // Add event Listener and bind the current 
    // object as this and the form as a variable 
    // so I don't need to traverse the dom to find values
    form.addEventListener('submit',this._handleSubmit.bind(this));
    this.section.appendChild(form);
    return this.section;
  };

  BookForm.prototype._createField = function(parent, opt) {
    // Create Field will take an options hash 
    // with an for/id key for the label, 
    // a label name, and the type of input 
    if (!opt.id || !opt.label || !opt.type ) {
      // Make sure id, label, and type are passed 
      // in or throw error
      throw "Need an id, label, and type for field";
    };
    // Create holder for each form group
    var div = document.createElement('div');
    div.className = 'form-group';

    var id = opt.id;
    var label = opt.label;
    var type = opt.type;
    // Create label and assign it the for attr 
    // and innerHTML from opt hash
    var i = document.createElement('label');
    i.setAttribute('for', id);
    i.innerHTML = label;

    var input = document.createElement('input')
    input.setAttribute('id', id);

    input.setAttribute('type', type );
    // If the input type if file, add onLoad listener 
    // that will the save the iamge to localStorage so
    // it can be used a source for the new books
    if (type == 'file') {
      input.addEventListener('change', this._handleUpload.bind(this));
    }
    div.appendChild(i);
    div.appendChild(input);
    parent.appendChild(div);
  };

  BookForm.prototype._handleUpload = function() {
    // Find input field for file
    var input = document.querySelector('#book-cover');
    
    // Check to see if files exist
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
  BookForm.prototype._handleSubmit = function(e) {
    e.preventDefault();
    if (this._isFormValid()) {
      var book = {reviews: [], rating: 0};
      book.title =  
        document.querySelector('#title').value;
      book.author = 
        document.querySelector('#author').value;
        // Grab image from local storage and set as image 
        // url in new book object
      book.image = localStorage.getItem(this.fileName);
      // Delegate adding new book to top level app with a passed down
      // function. This keeps all data/DOM maniuplation at the top level
      this.addBook(book, this.section);
    }
  };

  BookForm.prototype._isFormValid = function() {
    // Grap the title and author fields 
    var title = document.querySelector('#title');
    var author = document.querySelector('#author');
    var file = document.querySelector('#book-cover')
    var valid = true;
    // Check if either are empty and if so
    // add an errors class for styling and 
    // set valid to false 
    if (title.value.trim() == '') {
      title.className = 'error';
      valid = false;
    } else {
      title.className = '';
    }
    if (author.value.trim() == '') {
      author.className = 'error';
      valid = false;
    } else {
      author.className = '';
    }

    // Check to see if file field has any attched files and return error 
    // if none 
    if (!file.files[0]) {
      file.className = 'error';
      valid = false;
    } else {
      file.className = '';
    }
    return valid;

  }
})(this)