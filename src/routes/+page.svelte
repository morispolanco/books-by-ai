<script lang="ts">
  import { slugit } from "$lib/utils";

  export let data;

  const categories = [...new Set(data.books.map((book) => book.category))];
  categories.sort();
</script>

<h1>Library of books written by AI</h1>

<p><a href="/new"><button class="btn-success">Create New Book</button></a></p>

<div class="categories">
  {#each categories as category}
    <span class="category"><a href={`#${slugit(category)}`}>{category}</a></span>
  {/each}
</div>

{#each categories as category}
  <h3 id={slugit(category)}>{category}</h3>

  <ul>
    {#each data.books.filter((book) => book.category === category) as book}
      <li>
        <a href={`/book/${book.slug}/${book.id}`}>{book.title}</a>
      </li>
    {/each}
  </ul>
{/each}

<style>
  .categories {
    display: flex;
    flex-wrap: wrap;
    column-gap: 1rem;
    row-gap: 0.25rem;
    justify-content: space-between;
  }
</style>
