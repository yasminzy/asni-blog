<template>
  <footer
    v-if="ready"
    class="footer has-background-dark has-text-centered has-text-light"
  >
    <div class="container">
      <ul class="is-flex ml-0">
        <li v-for="(item, index) in socialMedia" :key="index">
          <a :href="item.link" class="has-text-white is-size-1 pl-1 pr-1">
            <span :class="'typcn typcn-social-' + urlize(item.name)" />
          </a>
        </li>
      </ul>

      <hr class="has-background-grey" />

      <p>© 2019 ASNI MEDIA</p>
    </div>
  </footer>
</template>

<script>
import { urlize } from "@/assets/functions";

export default {
  computed: {
    ready() {
      return this.$store.getters.ready.appFooter;
    },
    socialMedia() {
      return this.$store.getters.externalData.socialMedia;
    }
  },
  methods: {
    urlize
  }
};
</script>

<style lang="scss" scoped>
.is-flex {
  justify-content: center;
}
</style>
