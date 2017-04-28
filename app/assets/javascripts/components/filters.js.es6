//--------------------------------------------------------------------------------
// EventBus listener
//--------------------------------------------------------------------------------
window.EventBus = new Vue();

//--------------------------------------------------------------------------------
// filters
//--------------------------------------------------------------------------------
Vue.component('filters', {
  template: `
    <div class="filters">
      <span class="text--bold">Type of content:</span>
      <slot></slot>
    </div>
  `,

  data() {
    return {
      categories: []
    }
  },

  methods: {
    //update the active category array then emit the changes
    updateCategories:function(category){
      this.updateCategoryList();
      EventBus.$emit('filtersChanged', this.categories);
    },

    //update the active category array
    updateCategoryList: function(){
      var checkboxes = this.$children;

      if(checkboxes.length != 0){
        
        this.categories = [];

        checkboxes.forEach(checkbox => {

          if(checkbox.isActive){
            this.categories.push(checkbox.name);
          }
          
        });
      }
    }
  },

  mounted(){
    this.updateCategoryList();

    EventBus.$on('categoriesChanged', this.updateCategories);
  }
});

//--------------------------------------------------------------------------------
// checkbox
//--------------------------------------------------------------------------------
Vue.component('checkbox', {
  props: {
    name: { required: true },
  },

  template: `
    <span class="filters__checkbox" :class="{ 'active' : isActive }" @click='clickCheckbox'>
      {{ name }}
    </span>
  `,

  data(){
    return {
      isActive: { default: true }
    }
  },

  methods: {
    //update the isActive property for the checkbox and emit the change
    clickCheckbox: function(){
      this.isActive = !this.isActive;
      EventBus.$emit('categoriesChanged');
    }
  }
});

//--------------------------------------------------------------------------------
// articles
//--------------------------------------------------------------------------------
var test = Vue.component('articles', {
  template:`
    <div class="row small-up-1 medium-up-2 large-up-3 articles">
      <slot></slot>
    </div>
  `,

  methods: {
    //loop through each article and update the isActive property against the new active category array
    filterArticles: function(categories){
      this.articles.forEach(article => {
        article.isActive = categories.includes(article.category);
      });
    }
  },

  data(){
    return {
      articles: []
    }
  },

  mounted(){
    this.articles = this.$children;

    //refilter the articles when the filters change
    EventBus.$on('filtersChanged', this.filterArticles);
  }
});

//--------------------------------------------------------------------------------
// article
//--------------------------------------------------------------------------------
Vue.component('article-listing', {
  props: {
    category: { required: true }
  },

  template:`
    <div class="article column" :category="category" v-show="isActive">
      <slot></slot>
    </div>
  `,

  data(){
    return {
      isActive: true
    }
  }
});

//--------------------------------------------------------------------------------
// Vue instance
//--------------------------------------------------------------------------------
//Check for tabs on the page before adding Vue instance
var element = document.getElementById("articles");
if (element != null) {
  new Vue({
    el: '#articles'
  });
}