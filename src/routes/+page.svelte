<script lang="ts">
  import { slugit } from "$lib/utils";

  export let data;

  const categories = [...new Set(data.books.map((book) => book.category))];
  categories.sort();
</script>

<svelte:head>
  <title>Books written by AI</title>
  <meta name="twitter:title" content="Books written by AI" />
  <meta
    name="twitter:description"
    content="Read and easily create new books, tailored to your interests, with the help of ChatGPT."
  />
  <meta property="og:title" content="Books written by AI" />
  <meta
    property="og:description"
    content="Read and easily create new books, tailored to your interests, with the help of ChatGPT."
  />
</svelte:head>

<h1>Library of books written by AI</h1>

<p>
  Welcome :) Here, you can read and <b>create new books</b> from scratch, tailored to your interests,
  with the help of ChatGPT.
</p>
<p>
  Just provide a title and optionally additional instructions regarding the content of the book, and
  book overview plus table of contents will be generated for you.
</p>
<p>Chapter and their section content is generated on demand, once you start reading the book.</p>
<p>
  If you are not satisfied with the generated content, or need additional information or
  clarifications, the system allows you to <b>chat with the content</b>, in order to receive
  additional information tailored to your interests.
</p>
<p>Currently all the books are public, and listed on the homepage, sorted into categories.</p>

<p><a href="/new"><button class="btn-success">Create New Book</button></a></p>

<div class="categories paper">
  {#each categories as category}
    <span class="category"><a href={`#${slugit(category)}`}>{category}</a></span>
  {/each}
</div>

{#each categories as category}
  <h4 id={slugit(category)}>{category}</h4>

  <ol>
    {#each data.books.filter((book) => book.category === category) as book}
      <li>
        <a href={`/book/${book.slug}/${book.id}`}>{book.title}</a>
      </li>
    {/each}
  </ol>
{/each}

<style>
  .categories {
    display: flex;
    flex-wrap: wrap;
    column-gap: 1rem;
    row-gap: 0.25rem;
    justify-content: space-between;
  }

  b {
    text-decoration: underline;
  }
</style>
