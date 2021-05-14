<template>
  <div class="home">
    <h1>{{ msg }} Page</h1>
    <DataNull />
  </div>
</template>

<script>
import DataNull from '@/components/DataNull'

export default {
  name: 'Home',
  components: { DataNull },
  mixins: [],
  props: {
    msg: {
      type: String,
      default: 'Home',
    },
  },
  data: function () {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
