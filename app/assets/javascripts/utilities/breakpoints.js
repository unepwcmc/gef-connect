'use strict';

$(function(){
  breakpoint.init();  
});

var breakpoint = {
  init: function(){
    //set currentSize on page load
    breakpoint.checkSize();

    //update currentSize when the window changes size
    $(window).resize(breakpoint.checkSize);
  },

  small: 720, //match scss 
  medium: 1200, //match scss
  large: 1400, //match scss

  currentSize: 'large',

  checkSize: function(){
    var width = $(window).width();

    if(width < breakpoint.small){
      breakpoint.currentSize = 'small';

    } else if(breakpoint.small <= width < breakpoint.medium) {
      breakpoint.currentSize = 'medium';

    } else {
      breakpoint.currentSize = 'large';
    }
  },

  isSmall: function(){
    breakpoint.checkSize();

    if(breakpoint.currentSize == 'small'){ return true; }
    return false;    
  },

  isMedium: function(){
    breakpoint.checkSize();

    if(breakpoint.currentSize == 'medium'){ return true; }
    return false;
  },

  isLarge: function(){
    breakpoint.checkSize();
    
    if(breakpoint.currentSize == 'large'){ return true; }
    return false;
  }
};