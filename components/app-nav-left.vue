<template>
  <div :class="{ open: menu }" class="wrapper">
    <div class="overlay has-background-dark" />

    <div class="has-background-white icon-div is-flex pl-1 top">
      <span
        :class="{ 'is-block': !menu, 'is-none': menu }"
        class="is-size-3 typcn typcn-th-menu"
        @click="toggleMenu"
      />

      <span
        :class="{ 'is-block': menu, 'is-none': !menu }"
        class="is-size-3 pr-3 x typcn typcn-times"
        @click="toggleMenu"
      />
    </div>

    <div class="has-background-white menu-content is-flex is-uppercase">
      <div class="pl-1 pr-1">
        <AppNavLeftSearchBox />

        <ul class="mb-3 mt-3 topics">
          <li v-for="(item, index) in topics" :key="index" @click="toggleMenu">
            <nuxt-link
              :to="'/topic/' + urlize(item) + '/1'"
              class="has-text-dark has-text-weight-bold is-block mb-0"
            >
              {{ item }}
            </nuxt-link>
          </li>
        </ul>
      </div>

      <footer class="has-background-dark pt-1 pr-1 pb-1 pl-1">
        <figure class="image is-64x64 mb-3">
          <img v-lazy="brand.img" :alt="brand.alt" />
        </figure>

        <ul class="is-flex mb-1 social-media">
          <li v-for="(item, index) in socialMedia" :key="index">
            <a
              :href="item.link"
              class="has-text-white"
              target="_blank"
              @click="menu = !menu"
            >
              <span
                :class="
                  'is-size-3 mb-0 typcn typcn-social-' + urlize(item.name)
                "
              />
            </a>
          </li>
        </ul>

        <p class="mb-0 is-size-7 has-text-light">© 2019 ASNI MEDIA LLC</p>
      </footer>
    </div>
  </div>
</template>

<script>
import AppNavLeftSearchBox from "./app-nav-left-search-box";
import { urlize } from "@/assets/functions";

export default {
  components: {
    AppNavLeftSearchBox
  },
  props: {
    brand: {
      type: Object,
      required: true
    },
    socialMedia: {
      type: Array,
      required: true
    }
  },
  computed: {
    menu() {
      return this.$store.getters.page.menu;
    },
    topics() {
      return this.$store.getters.page.topics;
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit("page", ["menu", !this.menu]);
    },
    urlize
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  pointer-events: none;
  position: fixed;
  width: 100%;

  &.open {
    z-index: 1;

    .overlay {
      opacity: 0.5;
      visibility: visible;
    }

    .icon-div {
      pointer-events: none;
      transition: width 0.25s;
    }

    .x {
      pointer-events: all;
    }

    .menu-content {
      transform: none;
    }
  }
}

.open .icon-div,
.menu-content {
  width: 100vw;

  @media (min-width: 576px) {
    max-width: 300px;
    width: 100%;
  }
}

div.is-flex {
  flex-direction: column;
  justify-content: space-between;
}

.is-block {
  display: block;
}

.is-none {
  display: none;
}

.overlay {
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  transition: 0.3s;
  visibility: hidden;
  width: 100%;
}

.icon-div {
  -webkit-appearance: none;
  -webkit-tap-highlight-color: #4a4a4a;
  cursor: pointer;
  height: 60px;
  pointer-events: auto;
  touch-action: manipulation;
  width: 30px;
}

.top {
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.menu-content {
  -webkit-tap-highlight-color: #4a4a4a;
  contain: paint;
  flex-direction: column;
  height: calc(100% - 60px);
  left: 0;
  overflow-y: auto;
  pointer-events: auto;
  position: absolute;
  transform: translateX(-100%);
  transition: transform 0.3s;
  will-change: transform;
}

.topics {
  display: grid;
  row-gap: 1rem;

  li a:hover {
    opacity: 0.5;
  }
}

.social-media {
  li:not(last-child) {
    margin-right: 1.5rem;
  }
}

.footer {
  margin-top: auto;
}
</style>
