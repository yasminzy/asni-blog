<template>
  <form class="field is-grouped">
    <p class="control is-expanded">
      <input
        :value="query"
        class="input"
        placeholder="Search..."
        type="text"
        required
        @input="updateQuery"
        @keyup.enter="changeRoute"
      />
    </p>

    <p class="control">
      <button
        class="button is-primary"
        type="submit"
        @click.prevent="changeRoute"
      >
        <span class="typcn typcn-zoom" />
      </button>
    </p>
  </form>
</template>

<script>
import { closeMenu, urlize } from "~/assets/functions";

export default {
  computed: {
    query() {
      return this.$store.getters.page.query;
    }
  },
  methods: {
    changeRoute() {
      this.$router.push("/search/" + urlize(this.query) + "/1");

      this.closeMenu();
    },
    updateQuery(event) {
      this.$store.commit("page", ["query", event.target.value]);
    },
    closeMenu,
    urlize
  }
};
</script>
