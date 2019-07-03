<template>
  <div v-if="ready" class="container">
    <div class="section columns is-desktop" data-aos="fade-down-left">
      <div class="card column">
        <header class="card-header">
          <p class="card-header-title">
            <span class="mr-1 typcn typcn-user" />

            <nuxt-link :to="'/contributor/' + urlize(post.contributor) + '/1'">
              {{ post.contributor }}
            </nuxt-link>
          </p>

          <ArticleShareButtons
            :description="description"
            :title="title"
            :url="url"
            class="card-header-icon"
          />
        </header>

        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image">
                <img v-lazy="post.img" :alt="post.alt || post.title" />
              </figure>
            </div>

            <div class="media-content">
              <h1 class="title">{{ post.title }}</h1>

              <p class="subtitle">{{ post.time | moment("calendar") }}</p>
            </div>
          </div>

          <article v-html="post.article" />
        </div>
      </div>

      <div class="card column is-one-third-desktop">
        <header class="card-header">
          <div v-if="post.tags.length" class="card-header-title tags">
            <span v-for="(item, index) in post.tags" :key="index" class="tag">
              <nuxt-link :to="'/tag/' + urlize(item) + '/1'">
                {{ item }}
              </nuxt-link>
            </span>
          </div>
        </header>

        <div class="card-content">
          <vue-disqus
            shortname="yasminzy"
            :identifier="$store.state.route.path"
            :url="'https://asni.netlify.com' + $store.state.route.path"
          ></vue-disqus>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container">
    <progress class="progress is-small is-primary" max="100">15%</progress>
  </div>
</template>

<script>
import { urlize } from "@/assets/functions";
import ArticleShareButtons from "@/components/article-share-buttons";

export default {
  components: {
    ArticleShareButtons
  },
  computed: {
    description() {
      return this.post.highlight;
    },
    post() {
      return this.$store.getters.uniquePosts.article;
    },
    ready() {
      return this.$store.getters.ready.article;
    },
    title() {
      return this.post.title + " | Asni Blog";
    },
    url() {
      return "https://asni.netlify.com" + this.$store.state.route.path;
    }
  },
  created() {
    const uid = this.$store.state.route.path.replace("/article/", "");

    this.$store.commit("ready", ["article", false]);

    this.$store.dispatch("getPosts", ["uid", uid]);
  },
  methods: {
    urlize
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.card:last-of-type {
  margin-top: 3rem;
  align-self: flex-start;

  @media (min-width: 1200px) {
    margin-left: 3rem;
    margin-top: 0;
  }
}

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
