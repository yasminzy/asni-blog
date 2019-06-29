const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");
const Elements = PrismicDOM.RichText.Elements;

const linkResolver = function(doc) {
  return "/doc/" + doc.id;
};

const API_ENDPOINT = "https://asni.cdn.prismic.io/api/v2";
const API_TOKEN = process.env.VUE_APP_PRISMIC_API_TOKEN;

// Edit the HTML output from Prismic.
const htmlSerializer = function(type, element, children) {
  switch (type) {
    // Use sans-serif font for the headings.
    case Elements.heading2:
      return '<h2 class="is-family-sans-serif	">' + children.join("") + "</h2>";

    case Elements.heading3:
      return '<h3 class="is-family-sans-serif	">' + children.join("") + "</h3>";

    // Make the image responsive.
    case Elements.image:
      return (
        '<img class="pt-3 pb-3" src="' +
        element.url +
        '" alt="' +
        element.alt +
        '">'
      );

    // Use the default value for everything else.
    default:
      return null;
  }
};

export const state = () => ({
  externalData: {},
  page: {
    current: 0,
    last: 1,
    menu: false,
    query: "",
    topics: []
  },
  posts: [],
  ready: {
    appFooter: false,
    appNav: false,
    article: false,
    homeFeatured: false,
    homeHeader: false,
    thePosts: false
  },
  uniquePosts: {
    article: {},
    homeHeader: [],
    homeFeatured: []
  }
});

export const actions = {
  // Get brand logo and social media links. From "external" custom type in Prismic.
  getExternalData({ commit }) {
    Prismic.getApi(API_ENDPOINT, { accessToken: API_TOKEN })
      .then(function(api) {
        return api.query(Prismic.Predicates.at("document.type", "external"));
      })
      .then(
        function(response) {
          // This is a single type so there is only one item in the array.
          const obj = response.results[0];

          const content = {
            // Brand is the logo.
            brand: {
              // Store the img alt and url and name.
              alt: obj.data.brand.alt || "",
              img: obj.data.brand.url
            },
            // Social Media contains the link/s to social media.
            socialMedia: obj.data.social_media.map(obj => ({
              link: obj.link.url,
              // This should be taken from https://www.s-ings.com/typicons/, without "social-". For example, to get a Facebook logo we need to use "social-facebook" as a name, so the name here should be "Facebook".
              name: obj.name
            }))
          };

          // Mutate the "externalData" state.
          commit("externalData", content);
          // Show Footer
          commit("ready", ["appFooter", true]);
          // Show Nav
          commit("ready", ["appNav", true]);
        },
        function(error) {
          console.log(error); // eslint-disable-line no-console
        }
      );
  },

  // Get post/s from "post" custom type in Prismic.
  getPosts({ commit, state }, [type, arg]) {
    Prismic.getApi(API_ENDPOINT, { accessToken: API_TOKEN })
      .then(function(api) {
        // Options to pass in the request.
        let options;

        switch (type) {
          case "uid":
            // Get every fields.
            options = {};
            break;

          default:
            options = {
              // Get every fields except the content to make queries faster.
              fetch: [
                "post.contributor",
                "post.highlight",
                "post.image",
                "post.timestamp",
                "post.title",
                "post.topic"
              ],
              // Order posts by the first publication date from the most recent to the oldest.
              orderings: "[document.first_publication_date desc]",
              // Specify the page for pagination.
              page: state.page.current,
              // Get 6 documents from the API.
              pageSize: 6
            };
        }

        // Make different request based on the type.
        switch (type) {
          // Pass field id and value for requests based on the custom type field.
          case "contributor":
          case "topic":
          case "uid":
            return api.query(
              [
                Prismic.Predicates.at("document.type", "post"),
                Prismic.Predicates.at(`my.post.${type}`, arg)
              ],
              options
            );

          // Pass query for a fulltext search request.
          case "search":
            return api.query(
              [
                Prismic.Predicates.at("document.type", "post"),
                Prismic.Predicates.fulltext("document", state.page.query)
              ],
              options
            );

          // Pass an array of a tag string for a request based on the entry tag.
          case "tag":
            return api.query(
              [
                Prismic.Predicates.at("document.type", "post"),
                Prismic.Predicates.at("document.tags", arg)
              ],
              options
            );

          // Get all posts.
          default:
            return api.query(
              Prismic.Predicates.at("document.type", "post"),
              options
            );
        }
      })
      .then(
        function(response) {
          // Store the total pages that will be used in the "app-pagination" component.
          const totalPages = response.total_pages;

          // Mutate the "page.last" state.
          commit("page", ["last", totalPages]);

          // Content to pass in the mutation argument.
          let content;

          switch (type) {
            case "uid":
              // Take the post data.
              const obj = response.results[0];

              content = {
                // Store the img alt and url, article content and highlight text, contributor name, tags, time, title, and topic of the post.
                alt: obj.data.image.alt || "",
                article: PrismicDOM.RichText.asHtml(
                  obj.data.article,
                  linkResolver,
                  htmlSerializer
                ),
                contributor: obj.data.contributor,
                highlight: obj.data.highlight[0].text,
                img: obj.data.image.url || "",
                tags: obj.tags,
                time: obj.data.timestamp,
                title: obj.data.title[0].text,
                topic: obj.data.topic
              };

              // Mutate the "post" state.
              commit("uniquePosts", ["article", content]);
              // Show content in the "article/_index" page.
              commit("ready", ["article", true]);
              break;

            default:
              // Store the img alt and url, contributor name, article highlight text, the first tag, time, title, topic, and url of the posts.
              content = response.results.map(obj => ({
                alt: obj.data.image.alt || "",
                contributor: obj.data.contributor,
                highlight: obj.data.highlight[0].text,
                img: obj.data.image.url || "",
                tag: obj.tags[0],
                time: obj.data.timestamp,
                title: obj.data.title[0].text,
                topic: obj.data.topic,
                url: obj.uid
              }));

              // "the-posts" content exception: "headline" and "featured" tagged posts on the homepage.
              if (type === "tag" && !state.page.current) {
                // If the tag is "headline":
                if (arg[0] === "headline") {
                  // Get the most recent post.
                  content = content[0];

                  // Mutate the "home.header" state.
                  commit("uniquePosts", ["homeHeader", content]);
                  // Show content in the "home-header" component.
                  commit("ready", ["homeHeader", true]);
                }
                // If the tag is not "headline", which only means "featured":
                else {
                  // Get the first 5 most recent posts.
                  content = content.slice(0, 5);

                  // Mutate the "home.featured" state.
                  commit("uniquePosts", ["homeFeatured", content]);
                  // Show content in the "home-featured" component.
                  commit("ready", ["homeFeatured", true]);
                }
              } else {
                // Mutate the "posts" state.
                commit("posts", content);
                // Show content in the "the-posts" component.
                commit("ready", ["thePosts", true]);
              }
          }

          // Get topics for the "app-nav-left" component if the request is for the latest posts on the homepage, or the topics is less than 5.
          if (
            (content && (!type && !state.page.current)) ||
            state.page.topics.length < 5
          ) {
            // Store 5 unique values.
            const topics = [...new Set(content.map(post => post.topic))].slice(
              0,
              5
            );

            // Mutate the "topics" state.
            commit("page", ["topics", topics]);
            // Show content in the "app-nav" component.
            commit("ready", ["appNav", true]);
          }
        },
        function(error) {
          console.log(error); // eslint-disable-line no-console
        }
      );
  }
};

export const mutations = {
  externalData(state, payload) {
    state.externalData = payload;
  },
  page(state, payload) {
    state.page[payload[0]] = payload[1];
  },
  posts(state, payload) {
    state.posts = payload;
  },
  ready(state, payload) {
    state.ready[payload[0]] = payload[1];
  },
  uniquePosts(state, payload) {
    state.uniquePosts[payload[0]] = payload[1];
  }
};

export const getters = {
  externalData(state) {
    return state.externalData;
  },
  page(state) {
    return state.page;
  },
  posts(state) {
    return state.posts;
  },
  ready(state) {
    return state.ready;
  },
  uniquePosts(state) {
    return state.uniquePosts;
  }
};
