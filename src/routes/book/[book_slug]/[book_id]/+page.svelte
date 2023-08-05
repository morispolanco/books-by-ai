<script lang="ts">
  export let data;
</script>

<div class="margin-bottom"><a href="/">Book written by ChatGPT</a></div>

<div><i>{data.category}</i></div>

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
