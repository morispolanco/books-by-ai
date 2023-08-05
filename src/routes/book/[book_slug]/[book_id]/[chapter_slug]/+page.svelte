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

<div class="margin-bottom"><a href="/">Book written by ChatGPT</a></div>

<div><i>{data.category}</i></div>

<h2>
  <a href={`/book/${data.slug}/${data.id}`}>{data.title}</a>
</h2>

<h3>
  Chapter {data.chapter.title}
</h3>

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
