(function(root){

  // Data will be private and only accessable via 
  // the public methods of the data store. 
  // 
  var _data = {
    books: [],
    articles: []
  }
  root.DataStore = {
    // books, articles returns the appropriate array 
    books: function() {
      return _data[books];
    },

    articles: function() {
      return _data[articles];
    },

    addBook: function(book) {
      _data[books].push(book);
    },

    addArticle: function(article) [
    _data[articles].push(article);
    }


})(this);