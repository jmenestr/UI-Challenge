(function(root){
  root.Welcome = function() {
    this.section = document.createElement('section');
    this.section.className = 'card';
    this.section.id = 'welcome';
  };

  Welcome.prototype.render = function() {
    this._renderContent();
    this._renderButtons();
    return this.section;
  };

  Welcome.prototype._renderContent = function() {
    // Create holder container for content (h1 and body)
    var container = document.createElement('div');
    container.className = 'content';
    var header = document.createElement('h1');
    header.innerHTML = 'Welcome back!';
    container.appendChild(header);
    // Create paragraph for text 
    var body = document.createElement('p');
    body.innerHTML = "It's been a while. Ready any new books lately?";
    container.appendChild(body);
    // Append container to main section 
    this.section.appendChild(container);
  };

  Welcome.prototype._renderButtons = function() {
    //Create button container
    var buttons = document.createElement('div');
    buttons.className = 'buttons';

    var no = document.createElement('a');
    var yes = document.createElement('a');
    buttons.appendChild(no);
    buttons.appendChild(yes);
    // Set Innter text of buttons 
    no.innerHTML = 'No';
    yes.innerHTML = 'Yes';
    // Bind event listeners to the yes/no buttons 
    // via instance methods
    this.noClick = 
      no.addEventListener('click', this._handleNoClick.bind(this));
    this.yesClick = 
      yes.addEventListener('click', this._handleYesClick.bind(this));
    this.section.appendChild(buttons);
  };

  Welcome.prototype._handleNoClick = function(e) {
    e.preventDefault();
    var welcome = document.getElementById('welcome');
    welcome.parentNode.removeChild(this.section);
  };

  Welcome.prototype._handleYesClick = function(e) {
    e.preventDefault();
    var bookForm = new BookForm();
    document.body.replaceChild(bookForm.render(), this.section);
  };

})(this)