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

<div><i>Category: {data.category}</i></div>

<h4>{data.title}</h4>
<div>(by ChatGPT)</div>

<p>{data.summary}</p>

{#each data.toc as chapter}
  <h4><a href={`/book/${data.slug}/${data.id}/${chapter.slug}`}>{chapter.title}</a></h4>
  {#each chapter.sections as section}
    <div>
      <a href={`/book/${data.slug}/${data.id}/${chapter.slug}/${section.slug}`}>{section.title}</a>
    </div>
  {/each}
{/each}
