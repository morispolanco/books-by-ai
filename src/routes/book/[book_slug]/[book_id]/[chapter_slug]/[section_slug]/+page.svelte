<script lang="ts">
  import { SECTION } from "$lib/prompts.js";
  import { useChat, type Message } from "ai/svelte";
  import { onMount } from "svelte";
  import { marked } from "marked";

  export let data;

  let done = false;
  let prompt = "";

  function onFinish(message: Message) {
    done = $messages.length >= 2;
  }

  const { messages, append, setMessages, stop } = useChat({ onFinish });

  onMount(() => {
    append({
      role: "user",
      content: SECTION(data.title, data.tocText, data.chapter.title, data.section.title)
    });
  });

  function ask() {
    prompt = prompt.trim();
    if (!prompt) return;

    const message0 = $messages[0];
    const message1 = $messages[1];

    stop();
    setTimeout(() => {
      setMessages([message0, message1]);
      setTimeout(() => {
        append({ role: "user", content: prompt });
      }, 100);
    }, 100);
  }
</script>

<svelte:head>
  <title>{data.section.title}</title>
  <meta
    name="twitter:title"
    content={data.title + " / " + data.chapter.title + " / " + data.section.title}
  />
  <meta name="twitter:description" content={data.summary} />
  <meta
    property="og:title"
    content={data.title + " / " + data.chapter.title + " / " + data.section.title}
  />
  <meta property="og:description" content={data.summary} />
</svelte:head>

<div class="margin-bottom"><a href="/">Back to books written by AI</a></div>

<div><i>Category: {data.category}</i></div>

<h4 class="margin-none">
  <a href={`/book/${data.slug}/${data.id}`}>{data.title}</a>
</h4>

<h4 class="margin-none">
  <a href={`/book/${data.slug}/${data.id}/${data.chapter.slug}`}>Chapter {data.chapter.title}</a>
</h4>

<h4>Section {data.section.title}</h4>

<hr />

{#each $messages as message, index (message.id)}
  {#if index === 1}
    {@html marked(message.content)}
  {/if}
{/each}

{#if done}
  <form on:submit|preventDefault={ask}>
    <textarea
      bind:value={prompt}
      rows="5"
      class="margin-bottom"
      placeholder="Ask a clarification question..."
    />
    <button type="submit" class="btn-secondary">Ask</button>
  </form>
{/if}

{#each $messages as message, index (message.id)}
  {#if index === 3}
    {@html marked(message.content)}
  {/if}
{/each}

<div class="gap" />

<style>
  textarea {
    width: 100%;
    resize: vertical;
  }

  .gap {
    height: 10rem;
  }
</style>
