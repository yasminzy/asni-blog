<template>
  <nav
    v-if="current <= last"
    aria-label="pagination"
    class="pagination is-rounded mt-2"
    role="navigation"
  >
    <nuxt-link
      :disabled="current == 1"
      :to="`${Number(current) - 1}`"
      class="pagination-previous"
    >
      Newer
    </nuxt-link>

    <nuxt-link
      :disabled="current == last"
      :to="`${Number(current) + 1}`"
      class="pagination-next"
    >
      Older
    </nuxt-link>

    <ul v-if="last <= 3" class="ml-0 pagination-list">
      <li v-for="(item, index) in last" :key="index">
        <nuxt-link
          :aria-label="'Go to page' + item"
          :class="{ 'is-current': item === current }"
          :to="`${Number(item)}`"
          class="pagination-link"
        >
          {{ item }}
        </nuxt-link>
      </li>
    </ul>

    <ul v-else class="ml-0 pagination-list">
      <li>
        <nuxt-link
          :class="{ 'is-current': current === 1 }"
          :to="`${Number(1)}`"
          aria-label="Go to page 1"
          class="pagination-link"
        >
          1
        </nuxt-link>
      </li>

      <li>
        <span v-if="current > 3" class="pagination-ellipsis">
          &hellip;
        </span>
      </li>

      <li v-for="(item, index) in last" :key="index" class="is-flex">
        <nuxt-link
          v-if="
            item !== 1 &&
              (item === current - 1 ||
                item === current ||
                item === current + 1) &&
              item !== last
          "
          :aria-label="'Go to page' + item"
          :class="{ 'is-current': item === current }"
          :to="`${Number(item)}`"
          class="pagination-link"
        >
          {{ item }}
        </nuxt-link>
      </li>

      <li>
        <span v-if="current < last - 2" class="pagination-ellipsis">
          &hellip;
        </span>
      </li>

      <li>
        <nuxt-link
          :aria-label="'Go to page ' + last"
          :class="{ 'is-current': current === last }"
          :to="`${Number(last)}`"
          class="pagination-link"
        >
          {{ last }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    current() {
      return this.$store.getters.page.current;
    },
    last() {
      return this.$store.getters.page.last;
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
}

.pagination-list {
  @media (max-width: 576px) {
    display: none;
  }
}
</style>
