export default {
  mode: "universal",
  head: {
    title: process.env.npm_package_name || "Asni Blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#Hex	00C7A9" },
  css: ["typicons.font/src/font/typicons.css"],
  plugins: [
    "~/plugins/vue-disqus",
    "~/plugins/vue-lazyload",
    "~/plugins/vue-moment",
    "~/plugins/vue-social-sharing",
    "~/plugins/vuex-router-sync",
    { src: "~/plugins/aos", ssr: false }
  ],
  modules: ["@nuxtjs/bulma", "@nuxtjs/dotenv", "@nuxtjs/eslint-module"],
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    extend(config, ctx) {}
  },
  router: {
    scrollBehavior: function() {
      return { x: 0, y: 0 };
    }
  }
};
