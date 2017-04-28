var store = {
  state: {
    categories: []
  }
};

//--------------------------------------------------------------------------------
// filters
//--------------------------------------------------------------------------------
Vue.component('filters', {

  template: `
    <div>
      <slot></slot>
    </div>
  `,

  data() {
    return {
      categories: [],
      articles: []
    }
  },

  methods: {
    filterArticles: function(){
      console.log('filter articles');

      console.log(this.categories);
      console.log(this.articles);

      this.categories.forEach(category => {
        console.log(category.name);
        
      });
      
    },

    filterList: function(){
      var checkboxes = this.$children;
      if(checkboxes.length != 0){
        
        checkboxes.forEach(checkbox => {

          var newCategory = {
            name: checkbox.name,
            isActive: true
          };

          this.categories.push(newCategory);
          
        });
      }
    }
  },

  created(){
    
  }, 

  mounted(){
    this.filterList();
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
    clickCheckbox: function(){
      this.isActive = !this.isActive;
    }
  }
});

//--------------------------------------------------------------------------------
// articles
//--------------------------------------------------------------------------------
Vue.component('articles', {
  template:`
    <div class="row small-up-1 medium-up-2 large-up-3 articles">
      <slot></slot>
    </div>
  `,

  methods: {
    filterArticles: function(){
      this.articles.forEach(article => {
        console.log(article.category);
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
    this.filterArticles();
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
    el: '#articles',
  });  
}
