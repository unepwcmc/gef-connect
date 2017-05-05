//--------------------------------------------------------------------------------
// EventBus listener
//--------------------------------------------------------------------------------
window.EventBus = new Vue();

//--------------------------------------------------------------------------------
// Store
//--------------------------------------------------------------------------------
var store = {
  state: {
    articles: [], //contains article objects
    currentPage: 1,
    articlesPerPage: 0,
    activeCategoryArray: [], //contains the ticked categories
    activeArticleArray: [] //contains indicies of articles that whose category is 'active'
  }
}

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

  methods: {
    categoriesChanged:function(category){
      this.updateCategoryList();
      EventBus.$emit('filtersChanged');
    },

    //update the active category array
    updateCategoryList: function(){
      var checkboxes = this.$children;

      if(checkboxes.length != 0){
        
        var activeCategoryArray = [];

        checkboxes.forEach(checkbox => {

          if(checkbox.isActive){
            activeCategoryArray.push(checkbox.name);
          }
        });

        store.state.activeCategoryArray = activeCategoryArray;
      }
    }
  },

  mounted(){
    this.updateCategoryList();

    EventBus.$on('categoriesChanged', this.categoriesChanged);
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
    filterArticles: function(){
      store.state.activeArticleArray = [];

      store.state.articles.forEach(article => {
        article.catIsActive = store.state.activeCategoryArray.includes(article.category);
        if(article.catIsActive){ store.state.activeArticleArray.push(article.index); }
      });

      this.paginateArticles();
      store.state.currentPage = 1;
    },

    paginateArticles: function(){
      var pageStart = (store.state.currentPage - 1) * store.state.articlesPerPage;
      var pageEnd =  pageStart + store.state.articlesPerPage;

      this.currentPageArray = store.state.activeArticleArray.slice(pageStart, pageEnd);

      store.state.articles.forEach(article => {
        article.isActive = this.currentPageArray.includes(article.index);
      });
    },

    updateActiveArticles: function(){
      store.state.articles.forEach(article => {
        article.isActive = (this.currentPageArray.includes(article.index) && store.state.categories.includes(article.category));
      });
    },
  },

  data(){
    return {
      articleIndexArray: [],
      currentPageArray: []
    }
  },

  mounted(){
    store.state.articles = this.$children;

    //create array containing article indices
    store.state.articles.forEach(article => {
      this.articleIndexArray.push(article.index);
    });

    //refilter the articles when the filters change
    EventBus.$on('filtersChanged', this.filterArticles);

    //repaginate the articles when previous or next is clicked
    EventBus.$on('pageChanged', this.paginateArticles);

    this.filterArticles();
  }
});

//--------------------------------------------------------------------------------
// article
//--------------------------------------------------------------------------------
Vue.component('article-listing', {
  props: {
    category: { required: true },
    id: { required: true }
  },

  template:`
    <div class="article column" :category="category" v-if="isActive">
      <slot></slot>
    </div>
  `,

  data(){
    return {
      isActive: true,
      catIsActive: true,
      index: Number
    }
  },

  mounted() {
    this.index = this.id;
  }
});

//--------------------------------------------------------------------------------
// pagination
//--------------------------------------------------------------------------------
Vue.component('pagination', {
  props: {
    articlesPerPage: { required: true }
  },

  template: `
    <div class="row column">
      <div class="pagination" v-show="totalPages > 0">
        <span class="pagination__button" :class="{ 'pagination__button--active' : previousIsActive }" @click="changePage(previousIsActive, 'previous')"><< Previous</span> Page <span class="pagination__current">{{ currentPage }}</span> of {{ totalPages }} <span class="pagination__button" :class="{ 'pagination__button--active' : nextIsActive }" @click="changePage(nextIsActive, 'next')">Next >></span>
      </div>
    </div>
  `,

  data(){
    return {
      totalArticles: Number,
      currentPage: store.state.currentPage,
      lastPage: Number,
      totalPages: Number,
      nextIsActive: false,
      previousIsActive: false,
    }
  },

  methods: {

    updateButtons: function(){
      this.totalPages = Math.ceil(store.state.activeArticleArray.length/store.state.articlesPerPage);

      this.nextIsActive = this.currentPage < this.totalPages;
      this.previousIsActive = this.currentPage > 1;

      EventBus.$emit('pageChanged');
    },

    changePage: function(isActive, direction){
      if(isActive){
        
        var newPage = direction == 'next' ? this.currentPage + 1 : this.currentPage - 1;

        store.state.currentPage = newPage;
        this.updateCurrentPage();
        this.updateButtons();
      }
    },

    updateCurrentPage: function(){
      this.currentPage = store.state.currentPage;
    }
  },

  mounted(){
    store.state.articlesPerPage = this.articlesPerPage;

    this.updateButtons();

    EventBus.$on('filtersChanged', this.updateButtons);
    EventBus.$on('filtersChanged', this.updateCurrentPage);
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