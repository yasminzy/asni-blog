<template>
  <social-sharing
    :description="description"
    :title="title"
    :url="url"
    inline-template
  >
    <div class="field is-grouped">
      <div class="control">
        <network class="button has-text-white fb" network="facebook">
          <span class="typcn typcn-social-facebook" />

          <span>Share</span>
        </network>
      </div>

      <div class="control">
        <network class="button has-text-white twitter" network="twitter">
          <span class="typcn typcn-social-twitter" />

          <span>Tweet</span>
        </network>
      </div>
    </div>
  </social-sharing>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "Asni Blog"
    },
    url: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.fb {
  background-color: #3b5998;
}

.twitter {
  background-color: #1da1f2;
}
</style>
