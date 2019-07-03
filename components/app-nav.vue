<template>
  <nav v-if="ready" class="navbar is-fixed-top">
    <header
      :class="{ z: menu }"
      class="has-background-white is-flex"
      @click="closeMenu"
    >
      <nuxt-link to="/">
        <img v-lazy="brand.img" :alt="brand.alt" class="image is-48x48" />
      </nuxt-link>
    </header>

    <app-nav-left :brand="brand" class="z" :social-media="socialMedia" />
  </nav>
</template>

<script>
import { closeMenu } from "../assets/functions";
import AppNavLeft from "./app-nav-left";

export default {
  components: {
    AppNavLeft
  },
  computed: {
    brand() {
      return this.$store.getters.externalData.brand;
    },
    menu() {
      return this.$store.getters.page.menu;
    },
    ready() {
      return this.$store.getters.ready.appNav;
    },
    socialMedia() {
      return this.$store.getters.externalData.socialMedia;
    }
  },
  methods: {
    closeMenu
  }
};
</script>

<style lang="scss" scoped>
header {
  -webkit-tap-highlight-color: #4a4a4a;
  height: 60px;
  width: 100%;
}

.z {
  z-index: 0;
}

.is-flex {
  justify-content: center;
  align-items: center;
  position: fixed;
}
</style>
