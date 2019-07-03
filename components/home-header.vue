<template>
  <header v-if="ready" class="section" data-aos="fade-up">
    <div class="box">
      <nuxt-link :to="'/article/' + post.url" class="media">
        <div class="media-left">
          <figure class="image">
            <img v-lazy="post.img" :alt="post.title" />
          </figure>
        </div>

        <div class="media-content">
          <h2 class="title">{{ post.title }}</h2>

          <p class="subtitle">{{ post.highlight }}</p>

          <small>
            <nuxt-link :to="'/topic/' + urlize(post.topic) + '/1'">
              {{ post.topic }}
            </nuxt-link>
            |
            <nuxt-link :to="'/contributor/' + urlize(post.contributor) + '/1'">
              {{ post.contributor }}
            </nuxt-link>
          </small>
        </div>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import { urlize } from "@/assets/functions";

export default {
  computed: {
    post() {
      return this.$store.getters.uniquePosts.homeHeader;
    },
    ready() {
      return this.$store.getters.ready.homeHeader;
    }
  },
  created() {
    this.$store.dispatch("getPosts", ["tag", ["headline"]]);
  },
  methods: {
    urlize
  }
};
</script>

<style lang="scss" scoped>
.media {
  @media (max-width: 768px) {
    flex-direction: column;

    .media-left {
      margin: 0 auto 1rem;
    }
  }
}

.image {
  @media (min-width: 768px) {
    height: 128px;
    width: 128px;
  }
}
</style>
