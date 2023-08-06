<script lang="ts">
  import "papercss/dist/paper.min.css";
  import "../app.css";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";
  import { page } from "$app/stores";

  inject({ mode: dev ? "development" : "production" });
</script>

<div class="sm-12 md-8 col">
  <div class="column">
    <div class="nav margin-bottom">
      {#if $page.url.pathname !== "/"}
        <a href="/">Home</a>
      {/if}
      <a href="https://news.ycombinator.com/item?id=37022757" target="_blank">Discussion</a>
      <a href="https://github.com/tzador/books-by-ai" target="_blank">GitHub</a>
    </div>
    <slot />
  </div>
</div>

<style>
  .nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
