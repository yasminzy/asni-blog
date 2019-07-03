<template>
  <div class="page">
    <HomeHeader />
    <HomeLatest />
    <HomeFeatured />
  </div>
</template>

<script>
import HomeFeatured from "@/components/home-featured";
import HomeHeader from "@/components/home-header";
import HomeLatest from "@/components/home-latest";

export default {
  components: {
    HomeFeatured,
    HomeHeader,
    HomeLatest
  }
};
</script>
