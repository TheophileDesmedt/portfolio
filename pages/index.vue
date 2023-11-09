<template>
  <div class="posts">
    <main>
      <h2>Posts</h2>
    <!-- here we loop through the posts -->
      <div class="post" v-for="post in posts" :key="post.id">
        <h3>
        <!-- for each one of them, we’ll render their title, and link off to their individual page -->
          <a :href="`blog/${post.slug}`">{{ post.title.rendered }}</a>
        </h3>
        <div v-html="post.excerpt.rendered"></div>
        <a :href="`blog/${post.slug}`" class="readmore">Read more ⟶</a>
      </div>
    </main>
    </div>
  </template>
  
  <script>
  export default {
  computed: {
    posts() {
      return this.$store.state.posts;
    },
   },
  created() {
    this.$store.dispatch("getPosts");
  },
  };
  </script>
  