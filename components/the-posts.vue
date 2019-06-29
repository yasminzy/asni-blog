<template>
  <div v-if="ready" class="page section">
    <h2 v-if="home" class="has-text-weight-bold mb-2">Latest</h2>

    <h1 v-else-if="type === 'latest'" class="has-text-weight-bold is-size-1">
      Latest
    </h1>

    <h1 v-else class="has-text-weight-bold is-size-1">{{ title }}</h1>

    <p v-show="!posts.length">
      <nuxt-link class="button" to="/">
        Back to homepage
      </nuxt-link>
    </p>

    <ul class="ml-0">
      <li v-for="(item, index) in posts" :key="index" class="card is-flex">
        <header class="card-header">
          <p class="card-header-title mb-0">
            {{ item.time | moment("calendar") }}
          </p>

          <p
            v-if="item.tag === 'featured'"
            class="card-header-icon has-text-primary"
            aria-label="featured symbol"
          >
            <nuxt-link :to="'/tag/' + urlize(item.tag) + '/1'">
              <span class="typcn typcn-star-full-outline" />
            </nuxt-link>
          </p>
        </header>

        <nuxt-link :to="'/article/' + item.url" class="is-flex">
          <div class="card-image">
            <figure class="image">
              <img v-lazy="item.img" :alt="item.alt || item.title" />
            </figure>
          </div>

          <div class="card-content">
            <h2 v-if="!home" class="title">
              {{ trim(item.title) }}
            </h2>

            <h3 v-else class="title">
              {{ trim(item.title) }}
            </h3>

            <p class="subtitle">{{ trim(item.highlight) }}</p>
          </div>
        </nuxt-link>

        <footer class="card-footer">
          <nuxt-link
            :to="'/topic/' + urlize(item.topic) + '/1'"
            class="card-footer-item"
          >
            {{ item.topic }}
          </nuxt-link>

          <nuxt-link
            :to="'/contributor/' + urlize(item.contributor) + '/1'"
            class="card-footer-item"
          >
            {{ item.contributor }}
          </nuxt-link>
        </footer>
      </li>
    </ul>

    <app-paginator v-if="!home" />

    <p v-if="home" class="has-text-centered mt-2">
      <nuxt-link to="/latest/2" class="button is-primary">
        More stories
      </nuxt-link>
    </p>
  </div>

  <div v-else class="page section">
    <progress class="progress is-small is-primary" max="100">15%</progress>
  </div>
</template>

<script>
import {
  getWordAfterLastSlash,
  getWordBetweenSlashes,
  toTitleCase,
  urlize
} from "@/assets/functions";

import AppPaginator from "@/components/app-paginator";

export default {
  components: {
    AppPaginator
  },
  data() {
    return {
      siteTitle: "",
      title: ""
    };
  },
  computed: {
    currentPage() {
      return this.$store.getters.page.current;
    },
    home() {
      if (!this.currentPage) {
        return true;
      } else return false;
    },
    posts() {
      return this.$store.getters.posts;
    },
    ready() {
      return this.$store.getters.ready.thePosts;
    }
  },
  created() {
    this.$store.commit("ready", ["thePosts", false]);

    const rp = this.$store.state.route.path;

    const currentPage = Number(this.getWordAfterLastSlash(rp));
    this.$store.commit("page", ["current", currentPage]);

    if (!this.home) {
      this.type = this.getWordBetweenSlashes(rp);
      this.title = this.toTitleCase(rp, this.type);
      this.siteTitle = this.toTitleCase(rp, this.type) + " | Asni Blog";

      switch (this.type) {
        case "contributor":
          this.$store.dispatch("getPosts", ["contributor", this.title]);
          break;

        case "topic":
          this.$store.dispatch("getPosts", ["topic", this.title]);
          break;

        case "search":
          this.$store.dispatch("getPosts", ["search", ""]);
          break;

        case "tag":
          const tag = this.title.toLowerCase();
          this.$store.dispatch("getPosts", ["tag", [tag]]);
          break;

        default:
          this.title = "Latest | Asni Blog";
          this.$store.dispatch("getPosts", ["", ""]);
      }
    } else {
      this.$store.dispatch("getPosts", ["", ""]);
    }
  },
  methods: {
    getWordAfterLastSlash,
    getWordBetweenSlashes,
    toTitleCase,
    trim(input) {
      if (input.length <= 80) return input;

      return input.substr(0, input.lastIndexOf(" ", 80)) + "...";
    },
    urlize
  },
  head() {
    return {
      title: this.siteTitle || "Asni Blog"
    };
  }
};
</script>

<style lang="scss" scoped>
ul {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.is-flex {
  flex-direction: column;
  min-height: 300px;

  footer {
    margin-top: auto;
  }
}
</style>
