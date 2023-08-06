<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>{data.title}</title>
  <meta name="twitter:title" content={data.title} />
  <meta name="twitter:description" content={data.summary} />
  <meta property="og:title" content={data.title} />
  <meta property="og:description" content={data.summary} />
</svelte:head>

<div class="margin-bottom"><a href="/">Back to books written by AI</a></div>

<div><i>Category: {data.category}</i></div>

<h2>{data.title}</h2>

<p>{data.summary}</p>

{#each data.toc as chapter}
  <h4><a href={`/book/${data.slug}/${data.id}/${chapter.slug}`}>{chapter.title}</a></h4>
  {#each chapter.sections as section}
    <div>
      <a href={`/book/${data.slug}/${data.id}/${chapter.slug}/${section.slug}`}>{section.title}</a>
    </div>
  {/each}
{/each}
