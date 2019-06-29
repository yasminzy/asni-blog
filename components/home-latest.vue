<template>
  <ThePosts />
</template>

<script>
import ThePosts from "./the-posts";

export default {
  components: {
    ThePosts
  },
  created() {
    this.$store.commit("page", ["current", 0]);
  }
};
</script>
