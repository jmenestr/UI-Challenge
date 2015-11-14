(function(root){
root.Buttons = function() {
  this.buttons = [].slice.apply(arguments);
}

Buttons.prototype._render = function() {
   // Construct a container to hold the buttons
  var button_container = document.createElement('div');
  button_container.className = 'buttons'; 
  // Iterate over all the buttons that were passed 
  // in on construction 
  this.buttons.forEach(function(button){
    var btn = document.createElement('a');
    btn.innerHTML = button;
    button_container.appendChild(btn);
  })
  return button_container;
};

})(this)