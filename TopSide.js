
window.TopSide = function(element, trigger, options) {

  var _this = this;

  // return immediately if element doesn't exist
  if (!element) return;

  this.overlay = element;
  this.container = this.overlay.children[0];
  this.content = this.container.children[0];

  // retreive options
  options = options || {};
  this.topOffset = options.topOffset || 0;

  this.setup();

  this.container.addEventListener('touchstart', this, false);
  this.container.addEventListener('touchmove', this, false);
  this.container.addEventListener('webkitTransitionEnd', this, false);
  window.addEventListener('resize', this, false);

  trigger.addEventListener('click', function() {
    _this.overlay.style.display = 'block';
    setTimeout(function() {
      _this.overlay.className += ' open';
    }, 1);
  })

  this.overlay.children[1].addEventListener('click', function(event) {
    event.preventDefault();
    var exp = new RegExp('(\\s|^)open(\\s|$)');
    _this.overlay.className = _this.overlay.className.replace(exp,' ');
  }, false);

};

TopSide.prototype = {

  setup: function() {

    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.content.style.top = this.topOffset + 'px';
    this.content.style.minHeight = (this.screen.height - this.topOffset) + 'px';

  },

  handleEvent: function(event) {
    switch (event.type) {
      case 'touchstart': this.onTouchStart(event); break;
      case 'touchmove': this.onTouchMove(event); break;
      case 'webkitTransitionEnd': this.onTransitionEnd(event); break;
      case 'resize': this.setup; break;
    }
    event.stopPropagation();
  },

  onTouchStart: function(event) {

    this.start = {
      y: event.touches[0].pageY,
      scroll: this.container.scrollTop
    }

  },

  onTouchMove: function(event) {

    var height = this.container.offsetHeight,
        scroll = this.container.scrollHeight,
        start = this.start;

    if ((this.topOffset + this.content.offsetHeight) <= this.screen.height) event.preventDefault();

    if (start.scroll <= 0) this.container.scrollTop = 1;
    else if (start.scroll + height >= scroll) this.container.scrollTop = scroll - height - 1;

  },

  onTransitionEnd: function(event) {

    if (event.srcElement.parentNode.className.indexOf('open') < 0) {
      this.overlay.style.display = 'none';
    }

  }

};