<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <slot></slot>
      </nav>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {

        }
      },
      methods: {
        getBread() {
          console.log(1)
        }
      },
      watch: {
        $route(to, form) {
          console.log(to, form)
        }
      }
    }
</script>

<style scoped>

</style>
