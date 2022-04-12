<template>
  <div>
    <ul>
      <li></li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { s_name: "风味", s_id: '1', name: '咸', id: '1'},
        { s_name: "风味", s_id: '1', name: '甜', id: '2'},
        { s_name: "风味", s_id: '1', name: '辣', id: '3'},
        { s_name: "赠品", s_id: '2', name: '可乐', id: '4'},
        { s_name: "赠品", s_id: '2', name: '雪碧', id: '5'},
        { s_name: "备选", s_id: '3', name: '两双筷子', id: '6'},
        { s_name: "备选", s_id: '3', name: '手套', id: '7'},
      ]
    }
  },
  methods: {
    formatData() {
      let obj = {}
      for(let i = 0; i < this.list.length; i++) {
        let item = this.list[i]
        // console.log(obj)
        // obj['2']
        if(obj[item.s_id]) {
          // obj['1'].push
          obj[item.s_id].push(item)
          // obj = { 1: [
          //  { s_name: "风味", s_id: '1', name: '咸', id: '1'},
          //   { s_name: "风味", s_id: '1', name: '甜', id: '2'},
          //  { s_name: "风味", s_id: '1', name: '辣', id: '3'},
          // ] }
        } else {
          obj[item.s_id] = []
          // obj = { 1: []}
          // obj = { 1: [], 2: []}
          obj[item.s_id].push(item)
          // obj = { 1: [
          //  { s_name: "风味", s_id: '1', name: '咸', id: '1'}
          // ] }
           // obj = { 1: [
          //  { s_name: "风味", s_id: '1', name: '咸', id: '1'},
          //   { s_name: "风味", s_id: '1', name: '甜', id: '2'},
          //  { s_name: "风味", s_id: '1', name: '辣', id: '3'},
          // ],
          // 2: [
            //  { s_name: "赠品", s_id: '2', name: '可乐', id: '4'},
          // ]
          //  }
        }
      }
      console.log(obj)
    }
  },
  created() {
    this.formatData()
  },
}
</script>