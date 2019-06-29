<template>
  <div v-if="ready" class="section">
    <h2 class="has-text-weight-bold mb-2">Featured</h2>

    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-danger">
              <nuxt-link :to="'/article/' + posts[0].url" class="is-block">
                <p class="title">{{ posts[0].title }}</p>

                <p class="subtitle">{{ posts[0].contributor }}</p>
              </nuxt-link>
            </article>

            <article class="tile is-child notification is-warning">
              <nuxt-link :to="'/article/' + posts[1].url" class="is-block">
                <p class="title">{{ posts[1].title }}</p>

                <p class="subtitle">{{ posts[1].contributor }}</p>
              </nuxt-link>
            </article>
          </div>

          <div class="tile is-parent">
            <article class="tile is-child notification is-success">
              <nuxt-link :to="'/article/' + posts[2].url" class="is-block">
                <p class="title">{{ posts[2].title }}</p>

                <p class="subtitle">{{ posts[2].contributor }}</p>

                <figure class="image">
                  <img
                    v-lazy="posts[2].img"
                    :alt="posts[2].alt || posts[2].title"
                  />
                </figure>
              </nuxt-link>
            </article>
          </div>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child notification is-link">
            <nuxt-link :to="'/article/' + posts[3].url" class="is-block">
              <p class="title">{{ posts[3].title }}</p>

              <p class="subtitle">{{ posts[3].contributor }}</p>

              <div class="content">
                {{ posts[3].highlight }}
              </div>
            </nuxt-link>
          </article>
        </div>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <nuxt-link :to="'/article/' + posts[4].url" class="is-block">
            <div class="content">
              <p class="title">{{ posts[4].title }}</p>

              <p class="subtitle">{{ posts[4].contributor }}</p>

              <figure class="image">
                <img
                  v-lazy="posts[4].img"
                  :alt="posts[4].alt || posts[4].title"
                />
              </figure>

              <div class="content">
                <p>{{ posts[4].highlight }}</p>
              </div>
            </div>
          </nuxt-link>
        </article>
      </div>
    </div>

    <p class="has-text-centered mt-2">
      <nuxt-link to="/latest/2" class="button is-primary">
        Latest stories from Asni
      </nuxt-link>
    </p>
  </div>
</template>

<script>
import { urlize } from "@/assets/functions";

export default {
  computed: {
    posts() {
      return this.$store.getters.uniquePosts.homeFeatured;
    },
    ready() {
      return this.$store.getters.ready.homeFeatured;
    }
  },
  created() {
    this.$store.dispatch("getPosts", ["tag", ["featured"]]);
  },
  methods: {
    urlize
  }
};
</script>

<style lang="scss" scoped>
.notification {
  padding: 0;

  a:not(.button):not(.dropdown-item) {
    height: 100%;
    padding: 1.25rem 2.5rem 1.25rem 1.5rem;
    text-decoration: none;
  }
}
</style>
