<script lang="ts">
  import { CHAPTER } from "$lib/prompts.js";
  import { useChat, type Message } from "ai/svelte";
  import { onMount } from "svelte";
  import { marked } from "marked";

  export let data;

  const { messages, reload } = useChat({
    initialMessages: [
      {
        id: "0",
        role: "user",
        content: CHAPTER(data.title, data.tocText, data.chapter.title)
      }
    ]
  });

  onMount(reload);
</script>

<svelte:head>
  <title>{data.chapter.title}</title>
  <meta name="twitter:title" content={data.title + " / " + data.chapter.title} />
  <meta name="twitter:description" content={data.summary} />
  <meta property="og:title" content={data.title + " / " + data.chapter.title} />
  <meta property="og:description" content={data.summary} />
</svelte:head>

<div class="margin-bottom"><i>Category: {data.category}</i></div>

<h4>
  <a href={`/book/${data.slug}/${data.id}`}>{data.title}</a>
</h4>
<div>(by ChatGPT)</div>

<h4>
  Chapter {data.chapter.title}
</h4>

{#each data.chapter.sections as section}
  <div>
    <a href={`/book/${data.slug}/${data.id}/${data.chapter.slug}/${section.slug}`}>
      {section.title}
    </a>
  </div>
{/each}

{#each $messages as message, index (message.id)}
  {#if index === 1}
    {@html marked(message.content)}
  {/if}
{/each}
