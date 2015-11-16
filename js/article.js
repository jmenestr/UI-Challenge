(function(root){

  'use strict';
  // Define constant for total body length makes it 
  // clear what it means and makes it easier to maintain 
  
  var MAX_BODY_LENTH = 30;
  root.Article = function(article) {
    // Article class to hold a passed in json representation of the Article
    this.title = article.title; 
    this.sub_title = article.sub_title;
    this.image = article.image;
    this.text = article.text;
    this.section = document.createElement('section');

  };

  Article.prototype.render = function() {
    // Builds up book component and 
    // returns book section 
    this.section.className = 'card article cf';
    this._renderImage();
    this._renderContent();
    return this.section;
  };


  Article.prototype._renderImage = function() {
    // Create image container to hold image and title 
    var img_container = document.createElement('div');
    img_container.className = 'article__image'
    // Create img and h1 for article image and title 
    // respectively 
    var img = document.createElement('img');
    var title = document.createElement('h1');
    // Give image and h1 the image URL and title name respectively
    img.src = this.image;
    title.innerHTML = this.title;

    img_container.appendChild(img);
    img_container.appendChild(title);

    this.section.appendChild(img_container);
  };

  Article.prototype._renderContent = function() {
    // Create a container div that hold book information 
    // and book's buttons
    var articleInfo = document.createElement('div');
    articleInfo.className = 'article__text';
    var content = document.createElement('div');
    content.className = 'content'
    articleInfo.appendChild(content);

    // Create container div to hold book title and author 
    var sub_title = document.createElement('h2');
    sub_title.innerHTML = this.sub_title;
    content.appendChild(sub_title);

    // Shorten body content if overflows 20 characters
    // This allows us to handle a  general json resonse from the DB
    this._renderArticleBody(content);
    this._renderButtons(articleInfo);
    this.section.appendChild(articleInfo);

  };

  Article.prototype._renderArticleBody = function(parent) {
    var body_text = this.text.slice(0, MAX_BODY_LENTH) + "...";
    var body = document.createElement('p');
    body.innerHTML = body_text;
    parent.appendChild(body);
  };


  Article.prototype._renderButtons = function(parent) {
    // Create a new buttons component 
    // and append to the main section of the 
    // Article component 
    var btns = ['Share','Explore']
    // Construct a container to hold the buttons
    var button_container = document.createElement('div');
    button_container.className = 'buttons'; 
    // Iterate over buttons array and append each to the button_container
    btns.forEach(function(button){
      var btn = document.createElement('a');
      btn.innerHTML = button;
      button_container.appendChild(btn);
    });
    parent.appendChild(button_container); 
  };

})(this)
