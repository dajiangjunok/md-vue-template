<template>
  <div class="about">
    <h1>{{ msg }} Page</h1>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {},
  mixins: [],
  props: {
    msg: {
      type: String,
      default: 'About',
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
.About {
}
</style>
