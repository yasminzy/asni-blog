<template>
  <div class="has-background-light is-flex mh-100">
    <div class="mh-nav">
      <AppNav />
    </div>

    <div class="mh-div" @click="closeMenu">
      <nuxt class="container content" />
    </div>

    <div class="mt-auto">
      <AppFooter />
    </div>
  </div>
</template>

<script>
import { closeMenu } from "../assets/functions";
import AppFooter from "~/components/app-footer";
import AppNav from "~/components/app-nav";

export default {
  components: {
    AppFooter,
    AppNav
  },
  created() {
    if (!this.$store.state.externalData.length) {
      this.$store.dispatch("getExternalData");
    }
  },
  methods: {
    closeMenu
  }
};
</script>

<style lang="scss">
$sizes: (0, 0.5, 1, 1.5, 2, 2.5, 3);
$positions: ("top", "left", "bottom", "right");

@each $size in $sizes {
  @each $position in $positions {
    .m#{str-slice($position, 0, 1)}-#{$size} {
      margin-#{$position}: $size + rem !important;
    }
    .p#{str-slice($position, 0, 1)}-#{$size} {
      padding-#{$position}: $size + rem !important;
    }
  }
}

.is-flex.mh-100 {
  flex-direction: column;
}

.mh-100 {
  min-height: 100vh;
}

.mh-div {
  min-height: calc(100vh - 60px);
}

.mh-nav {
  min-height: 60px;
}

.mt-auto {
  margin-top: auto;
}

.page {
  min-height: calc(100vh - 60px);
}

.fb {
  background-color: #3b5998;
}

.twitter {
  background-color: #1da1f2;
}
</style>
