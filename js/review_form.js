(function(root){
  'use strict';

  root.ReviewForm = function(addReview) {
    this.section = document.createElement('section');
    this.section.className = 'review-form';
    this.rating = new root.StarRating({ max: 5, readOnly: false }, this._handleRatingClick.bind(this));
    this.addReview = addReview;
  };

  ReviewForm.prototype.render = function() {
    // Store form as a instance variable so it can be easily reference when 
    // replacing the rating component
    this.form = document.createElement('form');
    this._createField(this.form, { 
      id: "body", 
      label: "Revew the book!",
      type: "text"
      });
    // Append the reating component to the form
    this.form.appendChild(this.rating.render());
    var submit = document.createElement('input');
    submit.setAttribute('type','submit');
    submit.setAttribute('value','Post Reveiw');
    this.form.appendChild(submit);
    // Attach submit handler
    this.form.addEventListener('submit',this._handleSubmit.bind(this));
    this.section.appendChild(this.form);
    return this.section;
  };

  ReviewForm.prototype._handleSubmit = function(e) {
    e.preventDefault();
    // Construct new review from the form fields and the rating component 
    if (this._isValidForm()) {
      var review = {
        body: this.form.querySelector('#body').value,
        rating: this.rating.rating
      }
      this.addReview(review)
    } else {
      // if form is not valid, add error class to input field for styling 
      this.section.querySelector('input[type="text"]').className = 'error';
    }
  };

  ReviewForm.prototype._isValidForm = function() {
    return this.section.querySelector('input[type="text"]').value.trim() !== '';
  };

  ReviewForm.prototype._createField = function(parent, opt) {
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
    var label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerHTML = opt.label;

    var input = document.createElement('input')
    input.setAttribute('id', id);

    input.setAttribute('type', type );
    div.appendChild(label);
    div.appendChild(input);
    parent.appendChild(div);
  };
  
  ReviewForm.prototype._handleRatingClick = function(rating){
    // Create a new rating based on the binded rating of the click
    this.rating = new StarRating(
      { readOnly: false, 
        rating: rating
      }, this._handleRatingClick.bind(this));
    // Replace the current rating with the updated rating from the click handler
    var ratingComponent = this.section.querySelector('.star-rating');
    this.form.replaceChild(this.rating.render(), ratingComponent);
  };
})(this)