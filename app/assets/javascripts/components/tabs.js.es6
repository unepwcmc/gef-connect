//--------------------------------------------------------------------------------
// tabs
//--------------------------------------------------------------------------------
Vue.component('tabs', {
  template: `
    <div class="row">
      <div class="small-12 large-3 columns">
        <div class="tabs__dropdown">
          <p class="tabs__dropdown-title hide-for-medium">Select a section</p>
          <div class="v-dropdown-button tabs__dropdown-button hide-for-medium" @click="toggleDropdown()">{{ selectedTabName }}</div>
          <ul class="tab-titles" v-show="isOpen">
            <li v-for="tab in tabs" @click="selectTab(tab)" class="tab--title" :class="{ 'active' : tab.isActive }">
              {{ tab.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="small-12 large-9 columns">
        <slot></slot>
      </div>
    </div>
  `,

  data(){
    return {
      tabs: [],
      isOpen: true,
      selectedTabName: ''
    }
  },

  created(){
    this.tabs = this.$children;
  },

  mounted(){
    //set the title in the dropdown on page load
    this.tabs.forEach(tab => {
      if(tab.isActive){
        this.selectedTabName = tab.name;
      }
    });

    if(breakpoint.isSmall()){
      this.isOpen = false;
    }

    window.addEventListener('resize', this.updateDropdownStatus);
  },

  methods: {
    selectTab: function(selectedTab){
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectedTab.name);
      });

      this.selectedTabName = selectedTab.name;

      if(breakpoint.isSmall()){
        this.toggleDropdown();
      }
    },

    toggleDropdown: function(){
      this.isOpen = !this.isOpen;
    },

    updateDropdownStatus: function(){
      if(breakpoint.isSmall()){
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },
  }
});

//--------------------------------------------------------------------------------
// tab
//--------------------------------------------------------------------------------
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

//--------------------------------------------------------------------------------
// Vue instance
//--------------------------------------------------------------------------------
//Check for tabs on the page before adding Vue instance
var element = document.getElementById("vue-tabs");
if (element != null) {
  new Vue({
    el: '#vue-tabs',
  });  
}