Vue.component('my-slider', {
  data() {
    return {
      search: '',
      search_ret: this.md_list,
    }
  },
  props: ['md_list'],
  template: `
  <div class="pure-menu">
    <h1 class="pure-menu-heading" >Doc</h1>
    <form class="pure-form">
      <input v-model="search" type="text" v-on:input="handleInput" placeholder="Search" class="pure-input-1"/>
    </form>
    <ul class="pure-menu-list" v-if="search_ret.length > 0">
      <li class="pure-menu-item" v-for="(item, index) of search_ret" v-bind:key="index+item.name">
        <a :href="item.name" v-on:click="get_md($event)" class="pure-menu-link">{{ item.info }} </a>
      </li>
    </ul>
  </div>
  `,
   methods: {
    handleInput: function () {
      var search = this.search.trim();
      if (search && search.length > 0) {
        this.search_ret = this.md_list.filter(function (md) {
          return md.info.indexOf(search) > -1
        })
      } else {
        this.search_ret = this.md_list
      }
    },
    get_md: function(event) {
      this.$emit('show_md', event.target.getAttribute('href'))
      event.preventDefault()
    }
  }
})