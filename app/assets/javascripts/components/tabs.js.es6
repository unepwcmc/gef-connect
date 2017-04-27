Vue.component('tabs', {
  template: `
    <div class="row">
      <div class="small-12 large-3 columns">
        <ul class="tab-titles">
          <li v-for="tab in tabs" @click="selectTab(tab)" class="tab--title" :class="{ 'active' : tab.isActive }">
            {{ tab.name }}
          </li>
        </ul>
      </div>
      <div class="small-12 large-9 columns">
        <div class="tabs__dropdown">
          <slot></slot>
        </div>
      </div>
    </div>
  `,

  data(){
    return {
      tabs: []
    }
  },

  created(){
    this.tabs = this.$children;
  },

  methods: {
    selectTab: function(selectedTab){
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });
    }
  },

  computed: {
    getFirstTab(){
      console.log(this.tabs);
    }
  }
});

Vue.component('tab', {
  props: {
    name: { required: true },
    selected: { default: false }
  },

  template: `
    <div v-show="isActive" class="tab--content">
      <slot></slot>
    </div>
  `,

  data(){
    return {
      isActive: false
    }
  },

  mounted(){
    this.isActive = this.selected
  }
});

Vue.component('dropdown', {
  props: {
    selected: ''
  },

  template: `
    <div class="hide-for-medium">
      select
    </div>
  `,

  mounted(){
  },

  computed: {

  }
});

//Add event listener so that vue works with turbolinks
//Check for tabs on the page before adding Vue instance
var element = document.getElementById("vue-tabs");
if (element != null) {
  new Vue({
    el: '#vue-tabs',
  });  
}