(function(root){
  'use strict';
  root.NavBar = function(links) {
    // Takes in array of links (or titles) for the nav bar 
    this.links = links;
    this.nav = document.createElement('nav');
    this.nav.id = 'main-nav';
  };

  NavBar.prototype.render = function() {
    // Delegates helper methods to render the title and to 
    // render the nav bar itself. Modularizes the code
    // and keeps invidiual function length down
    this._reset();
    this._renderHeader();
    this._renderNav();
    return this.nav;
  };

  NavBar.prototype._renderHeader = function() {
    // Create wrapper div for the header so I can easily 
    // modify with background image for media queries 
    var header = document.createElement('div');
    // Create div for mobile nav icon and use media queries to 
    // set display
    var navIcon = document.createElement('div');
    navIcon.className = 'nav-icon';
    header.appendChild(navIcon);
    // Create header text for navbar 
    var h1 = document.createElement('h1');
    header.appendChild(h1);
    h1.innerHTML = 'My Books';

    // Bind click handler to navIcon so when displayed user 
    // can toggle nav menu
    navIcon.addEventListener('click', this._toggleNav.bind(this));
    this.nav.appendChild(header);
  };

  NavBar.prototype._renderNav = function() {
    // Create instance variable for ul to refrence for responsive design
    this.ul = document.createElement('ul');
    this.ul.className = 'cf';

    this.links.forEach(function(link) {
    // interates over all links, creates new li element each oneand appends to main Nav ul
      var li = document.createElement('li');
      var a = document.createElement('a');
      li.appendChild(a);
      a.href = "#";
      a.innerHTML = link;
      this.ul.appendChild(li);
    }.bind(this))

    this.nav.appendChild(this.ul);
  };

  NavBar.prototype._toggleNav = function(e) {
    // Toggle class of navIcon to display close icon
    e.currentTarget.classList.toggle('close');
    // Toggle the ul nav list to visible or hidden
    this.ul.classList.toggle('visible');
  };

  NavBar.prototype._reset = function() {
    // Reset function to prevet dublicate data if render is called more than once
    this.nav.innerHTML = "";
  };

  NavBar.prototype.sectionContainer = function() {
    // return section for easy swapping when the navbar is updated 
    return this.nav;
  };

})(this)
