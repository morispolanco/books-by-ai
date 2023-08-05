<script lang="ts">
  import { goto } from "$app/navigation";
  import { TABLE_OF_CONTENTS, SUMMARY, CATEGORY } from "$lib/prompts";
  import type { Book } from "$lib/types";
  import { slugit } from "$lib/utils";
  import { useChat, type Message } from "ai/svelte";
  import { Button } from "spaper";

  let title = "";
  let instructions = "";
  let done = false;

  function onFinish(message: Message) {
    if ($messages.length === 2) {
      append({ role: "user", content: SUMMARY });
    }
    if ($messages.length === 4) {
      append({ role: "user", content: CATEGORY });
    }
    if ($messages.length === 6) {
      done = true;
    }
  }

  function onError(error: Error) {
    console.log("onError", error);
  }

  const { messages, setMessages, append, stop } = useChat({ onFinish, onError });

  function generate() {
    done = false;
    title = title.trim();
    if (!title) return;

    stop();
    setTimeout(() => {
      setMessages([]);
      setTimeout(() => {
        append({ role: "user", content: TABLE_OF_CONTENTS(title, instructions) });
      }, 100);
    }, 100);
  }

  async function create() {
    const book: Book = {
      title,
      slug: slugit(title),
      toc: $messages[1].content,
      summary: $messages[3].content,
      category: $messages[5].content
    };

    const response = await fetch("/api/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    });
    if (response.ok) {
      const url = await response.text();
      goto(url);
    } else {
      console.error("Failed to create book", response.status, response.statusText);
    }
  }
</script>

<h2 class="margin-none">Generate New Book using ChatGPT</h2>

<div class="margin-bottom" />

<div class="column margin-bottom">
  <label for="title">Enter the title of the book :</label>
  <input type="text" id="title" placeholder="The World History" bind:value={title} />
</div>

<div class="column margin-bottom">
  <label for="instructions">Optionally enter extra content instructions :</label>
  <textarea
    id="instructions"
    rows="5"
    placeholder="Provide unbiased view covering all the continents"
    bind:value={instructions}
  />
</div>

<div class="row margin-bottom">
  <Button type="secondary" on:click={generate} disabled={title.trim().length === 0}>
    Generate Book Contents
  </Button>
</div>

{#each $messages as message, index (message.id)}
  {#if index === 1}
    <h4 class="margin-none">Table of Contents</h4>
    <pre>{message.content}</pre>
  {/if}
  {#if index === 3}
    <h4 class="margin-none">Summary</h4>
    <div class="margin-bottom">
      {message.content}
    </div>
  {/if}
  {#if index === 5}
    <h4 class="margin-none">Category</h4>
    <div class="margin-bottom">
      {message.content}
    </div>
  {/if}
{/each}

<div class="row margin-bottom">
  {#if done}
    <Button type="success" on:click={create}>Create Book</Button>
    <div class="margin">Create the book in order to read or share it.</div>
  {:else}
    <Button type="success" disabled>Create Book</Button>
    <div class="margin">
      You will be able to create the book once its contents have been generated.
    </div>
  {/if}
</div>

<style>
  #title,
  #instructions {
    width: 100%;
  }
</style>
