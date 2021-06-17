Vue.component('my-md', {
  data() {
    return {
      mdContent: ''
    }
  },
  props: ['md_name'],
  template: '<div v-html="mdContent" v-highlight></div>',
  watch:{
    md_name(newV, oldV){
      let self = this;
      console.log(newV, "  ", oldV)
      if(self.md_name.length == 0) {
        self.mdContent = '';
        return
      }
      axios
        .get(self.md_name)
        .then(function (response) {
          let start = `<div class=" pure-g"><div class="pure-u-1">`;
          let end = `</div></div>`;
          self.mdContent = start + marked(response.data) + end;

        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted: function () {
    const renderer = {
      heading(text, level, raw, slugger) {
        if (level == 3) {
          this.header = 3
          return `
                </div></div> <div class=" pure-g">
              <div class="pure-u-1 pure-u-xl-1-2">
                  <h${level}>${text}</h${level}>
              `;
        } else if (level == 4) {
          if (this.header == 3) {
            this.header = 4
            return `
                  </div><div class="right-dark pure-u-1 pure-u-xl-1-2">
                    <h${level}>${text}</h${level}>
                `;
          } else {
            return false;
          }
        }
        return false;
      }
    };
    marked.use({
      renderer,
      breaks: true
    });
  },
})