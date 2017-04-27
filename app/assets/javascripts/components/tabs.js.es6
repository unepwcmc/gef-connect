Vue.component('tabs', {
  template: `
    <div>
      Tabs here
      <ul>
        <li v-for="tab in tabs" @click="selectTab(tab)">
          {{ tab.name }}
        </li>
      </ul>
      <slot></slot>
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
  }
});

Vue.component('tab', {
  props: {
    name: { required: true },
    selected: { default: false }
  },

  template: `
    <div v-show="isActive">
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

//Add event listener so that vue works with turbolinks
//Check for tabs on the page before adding Vue instance
var element = document.getElementById("vue-tabs");
if (element != null) {
  new Vue({
    el: '#vue-tabs',
  });  
}