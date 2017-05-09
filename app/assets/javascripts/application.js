// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require vue
//= require foundation.core.js.es6
//= require foundation.util.triggers.js
//= require foundation.util.mediaQuery.js
//= require foundation.responsiveMenu.js
//= require foundation.responsiveToggle.js
//= require_tree ./utilities
//= require_tree ./components

$(function(){ 
  $(document).foundation();

  //required to prevent FOUC
  $('html').removeClass('loading-js');

  if(true){
    $('body').addClass('test');
  }

  if(typeof process !== 'undefined'){
    $('body').addClass('hello');
    console.log(process.env.NODE_ENV);
    Vue.config.productionTip = process.env.NODE_ENV == 'development'
  }
});

//options that need to be set to false in production
// Vue.config.productionTip = false;
// Vue.devtools = false;
// Vue.performance = false;