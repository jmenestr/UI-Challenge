(function(root){
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

    this.readOnly = defaults.readOnly
    this.rating = defaults.rating;
    this.max = defaults.max;
    this.container = document.createElement('ul');
    this.container.className = 'star-rating cf';
    this.stars = [];
  };

  StarRating.prototype.render = function() {
    // Exposes public render method that delegates to 
    // private methods to render correct 
    // version of rating system
    if (this.readOnly) {
      this._renderReadOnly();
    } else {
      this._renderInteractive();
    }

    //append stars to the container
    this.stars.forEach(function(star){
      this.container.appendChild(star);
    }.bind(this));
    return this.container;
  };

  StarRating.prototype._renderReadOnly = function() {
    // Utilizes font-awesome library for full/half stars
    // Round to the nearest half star for average rating
    var rating = Math.round(this.rating * 2) / 2;
    var fullStars = 0;
    var halfStars = 0;
    if (rating % 1 == 0)
      // Check if the score is is an integer
      fullStars = rating;
    else {
      // calculate full stars then add one half star
      fullStars = rating - 0.5;
      halfStars = 1;
    }
    // push full stars into stars array
    for (var i = 0; i < fullStars; i++) {
      this.stars.push(this._createFullStar());
    }
    // push half stars into array
    if (halfStars > 0)
      this.stars.push(this._createHalfStar());
    // push empty stars into the rest of the array
    for (var j = 0; j < (this.max - (fullStars + halfStars)); j++){
      this.stars.push(this._createEmptyStar());
    }

  };  

  StarRating.prototype._renderInteractive = function() {
    // Iterate up to the max rating 
    for (var i = 1; i <= this.max; i++) {
      // Create a custom clickhandler binded to the correct 
      // rating for each star
      var clickHandler = this._handleClick.bind(this, i);
      if (i <= this.rating) {
        // Add in full stars up to the rating
        var fullStar = this._createFullStar();
        fullStar.addEventListener('click', clickHandler);
        this.stars.push(fullStar);
      } else {
        // Fill in the rest with empty stars
        var emptyStar = this._createEmptyStar();
        emptyStar.addEventListener('click', clickHandler);
        this.stars.push(emptyStar);
      }
    }
  };

  StarRating.prototype.rating = function() {
    return this.rating;
  };
  
  StarRating.prototype._createHalfStar = function() {
    var star = document.createElement('i');
    star.className = 'fa fa-star-half-o fa-1x';
    return star;
  };

  StarRating.prototype._createFullStar = function() {
    var star = document.createElement('i');
    star.className = 'fa fa-star fa-1x';
    return star;
  };

  StarRating.prototype._createEmptyStar = function() {
    var star = document.createElement('i');
    star.className = 'fa fa-star-o fa-1x';
    return star;
  };

})(this)