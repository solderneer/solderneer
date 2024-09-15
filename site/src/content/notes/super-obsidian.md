---
title: Super Obsidian
emoji: 🪨
pubDate: 11-Jul-2023
updatedDate: 11-Jul-2023
tags:
  - technology
---

This note is the **twenty-fifth letter** in the [[104-days-of-summer-vacation]] series. You can also follow the full twitter thread [here](https://twitter.com/solderneer/status/1668911213810716672), and leave any thoughts and comments that might come up!

---

**Dearest Reader,**

It looks like the AI powered tools are here, and the AI powered tools are here to stay. The good news is that all of us have been gifted the tools of hyper-productivity, to be able to create more impact than we could before.

The bad news is that LLM based infrastructure heavily favors cloud-based apps over local-first apps. This means that products like [Notion](https://www.notion.so/) have an intrinsic edge over products like [Obsidian](https://obsidian.md/).

To attach a more concrete face to the problem, today I started thinking about how I might use AI to speed up my thinking and writing workflow in Obsidian. I've identified the following wishlist for a start.

1. **Text generation** - the ability to generate or continue text given a prompt
2. **Text formatting**  - the ability to summarize, change tone, spell/grammar check
3. **Related Notes** - the ability to retrieve related notes given a specific note
4. **Semantic Search** - the ability to retrieve related notes given a query
5. **Hybrid Search** - the ability to combine fuzzy keyword search with semantic search
6. **Question-Answer Search** - the ability to ask questions to my entire set of notes 
7. **Text Classification** - the ability to auto-tag, topic model and plot semantic graphs

In broader categories, it boils down to _generation, editing, search and classification._ It's an added bonus if the plugins also use local embeddings to preserve Obsidian's local-first ethos. (I explored this in [[self-socratic-dialogues]]!)

Then, I looked through every single AI-enabled plugin in the Obsidian Community Marketplace, to curate the most effective AI plugins I could use today. What I found wasn't super encouraging, lots of the Obsidian AI plugins are cumbersome, lack a significant set of features or just plain don't work.

Of all the ones I looked through, the only plugin I am considering using is [obsidian-copilot](https://github.com/logancyang/obsidian-copilot) and it is missing half of the wish list I laid out above. This is concerning because, if Obsidian fails to help people leverage the cognitive shortcuts enabled by LLMs, they **will** migrate to better integrated software like Notion. The increase in efficiency enabled by the features above is too significant to ignore.

Fortunately, from my experiments two weeks ago in [[self-socratic-dialogues]], there doesn't seem to be any technical constraint preventing an elegant local embedding implementation for Obsidian. An embedding index running on my Macbook Pro 2016, runs fast enough for real-time semantic search, and indexes locally at about 100 files every 10 minutes.

There's definitely still space for anyone who wants to work on a be-all-end-all AI plugin for Obsidian, the space is very nascent. One of the reasons I was looking into this was because I wanted to build one myself - if you're interested in working on one, please reach out to me on [twitter](https://twitter.com/solderneer)!

(I've attached a detailed overview of all the AI Obsidian tools I looked through to this note)

~ Shan


---

## [obsidian-ava](https://github.com/louis030195/obsidian-ava)

**😢: I tried this plugin, and it seems to be broken currently, unfortunately.**

This plugin is intended to be a fully functional AI assistant, baked directly into Obsidian. It's the highest ranked result, and has the greatest depth of features.

**Features:**
- ✅ Text generation
- ✅ Text formatting
- ✅ Related Notes
- ❌ Semantic Search
- ❌ Hybrid Search
- ✅ Question-Answer Search
- ❌ Text Classification

_✨ Extras: Image Generation_

## [chatgpt-md](https://github.com/bramses/chatgpt-md)

This is mostly a wrapper around ChatGPT, and lets the user hold conversations similar to the ChatGPT UI. Not exactly what I'm looking for in an AI tool, I'd like some more specific features to the Obsidian experience.

**Features:**
- ✅ Text generation
- ✅ Text formatting
- ❌ Related Notes
- ❌ Semantic Search
- ❌ Hybrid Search
- ❌ Question-Answer Search
- ❌ Text Classification

## [obsidian-copilot](https://github.com/logancyang/obsidian-copilot)

**👍: I tried this plugin, and it works well. It does everything it claims to do, and it performs reasonably. I like it!**

This is a plugin sitting in-between obsidian-ava and chatgpt-md. It uses a conversational ChatGPT-esque interface with a side-by-side window design that's very minimalist. One cool thing is that it uses a **local embedding store**, and only sends the required context to the LLM API of choice. This means that it is, in a sense, more privacy-preserving than the previous options.

**Features:**
- ✅ Text generation
- ✅ Text formatting
- ❌ Related Notes
- ❌ Semantic Search
- ❌ Hybrid Search
- ✅ Question-Answer Search: **but only with a single file at a time**
- ❌ Text Classification

_✨ Extras: Local Embeddings_

![](https://github.com/logancyang/obsidian-copilot/blob/fe2ba58196bed21bc2c31cdb3b9b440840aa8e94/images/ui.png?raw=true)

## [obsidian-ai-assistant](https://github.com/qgrail/obsidian-ai-assistant)

This plugin focuses more on the variety of integrated models rather than specific AI-assistance features for Obsidian writing. It supports text, image and audio generation, but in a fairly boilerplate manner.

**Features:**
- ✅ Text generation
- ✅ Text formatting: **manual prompting**
- ❌ Related Notes
- ❌ Semantic Search
- ❌ Hybrid Search
- ❌ Question-Answer Search
- ❌ Text Classification

_✨ Extras: Audio Generation_

## [auto-classifier](https://github.com/HyeonseoNam/auto-classifier)

This is a specialized plugin that focuses on using ChatGPT to classify text into topics, to suggest frontmatter tags. Very cool stuff, would love to see more interesting versions of this with topic modeling or semantic graphs.

**Features:**
- ❌ Text generation
- ❌ Text formatting
- ❌ Related Notes
- ❌ Semantic Search
- ❌ Hybrid Search
- ❌ Question-Answer Search
- ✅ Text Classification

## [obsidian-gpt](https://github.com/M7mdisk/obsidian-gpt)

This is also a specialized plugin, which focuses on question-answer. Many of the plugins above already include the features of this plugin.

**Features:**
- ❌ Text generation
- ❌ Text formatting
- ❌ Related Notes
- ❌ Semantic Search
- ❌ Hybrid Search
- ✅ Question-Answer Search
- ❌ Text Classification

## [obsidian-semantic-search](https://github.com/bbawj/obsidian-semantic-search)

**😢: I tried this plugin, and it seems to be broken currently, unfortunately.**

This is a specialized plugin for semantic search using OpenAI embeddings. I like the idea of this plugin because it does one thing, and it does it well. The floating modal interface is simple and should just work.

**Features:**
- ❌ Text generation
- ❌ Text formatting
- ❌ Related Notes
- ✅ Semantic Search
- ❌ Hybrid Search
- ❌ Question-Answer Search
- ❌ Text Classification

## [ai-mentor](https://github.com/clementpoiret/ai-mentor) and [obsidian-gpt-liteinquirer-plugin](https://github.com/ittuann/obsidian-gpt-liteinquirer-plugin) and [obsidian-ring-a-secretary](https://github.com/vrtmrz/ring-a-secretary)

These are very similar to `obsidian-copilot`, both offer a ChatGPT-esque interface. One cool thing that `ai-mentor` does, is that it can simulate different mentorship figures (like a scientist).

**Features:**
- ✅ Text generation
- ✅ Text formatting utilities (to summarize, change tone, grammar check etc.)
- ❌ Related Notes
- ❌ Semantic Search
- ❌ Hybrid Search
- ❌ Question-Answer Search
- ❌ Text Classification

_✨ Extras: Mentorship Simulation_

## [obsidian-brain](https://github.com/lusob/obsidian-brain)

This is another plugin specifically for question answering. This plugin also uses an additional custom docker container which runs a seperate python server responsible for indexing embeddings for the document.

**Features:**
- ❌ Text generation
- ❌ Text formatting
- ❌ Related Notes
- ❌ Semantic Search
- ❌ Hybrid Search
- ✅ Question-Answer Search
- ❌ Text Classification

## [silicon](https://github.com/deepfates/silicon)

This plugin uses OpenAI text embeddings to do related notes lookup.

**Features:**
- ❌ Text generation
- ❌ Text formatting
- ✅ Related Notes
- ❌ Semantic Search
- ❌ Hybrid Search
- ❌ Question-Answer Search
- ❌ Text Classification

**Some others I think are similar enough to the options above that I won't elaborate:**
[vault-chat](https://github.com/exoascension/vault-chat)