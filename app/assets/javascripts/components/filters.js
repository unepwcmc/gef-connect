var store = {
  state: {
    categories: []
  }
};

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
      checkboxes = this.$children;
      if(checkboxes.length != 0){
        // console.log(categories);

        checkboxes.forEach(checkbox => {

          // console.log(category.name);

          newCategory = {
            name: checkbox.name,
            isActive: true
          };

          this.categories.push(newCategory);
          
        });
      }

      // console.log(this.categories);
    }
  },


  // mounted: function(){
  //   $.ajax({
  //     url:'/filters.json',
  //     success: function(res){
  //       this.filters = res
  //     }
  //   });
  // }

  created(){
    
  }, 

  mounted(){
    this.filterList();
  }
});

Vue.component('checkbox', {
  props: {
    name: { required: true },
  },

  template: `
    <p class="filters__checkbox" :class="{ 'active' : isActive }" @click='clickCheckbox'>
      {{ name }}
    </p>
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

Vue.component('articles', {
  template:`
    <div class="articles">
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

Vue.component('article-listing', {
  props: {
    category: { required: true }
  },

  template:`
    <div class="listing" :category="category" v-show="isActive">
      <slot></slot>
    </div>
  `,

  data(){
    return {
      isActive: true
    }
  }
});

//declare new Vue instance
if($('#app').length > 0){
  new Vue({
    el: '#app'
  });  
}