---
slug: juicebox-jokedao
title: Create JokeDAO Contests for Juicebox Projects
image: /img/jokedao.webp
authors: [nicholas]
tags: [guide]
---

# How to Create JokeDAO Contests for Juicebox Projects

In this video, I'll show you how to:

- Create a list of addresses that hold your project's tokens using [Juicebox.money](https://juicebox.money)
- Create a list of addresses that have voted in your project's [Snapshot](https://docs.snapshot.org/graphql-api)
- Create a [JokeDAO](https://www.jokedao.io/) contest
- Airdrop voting tokens using [Coinvise](https://www.coinvise.co/)

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/KIL8MpcqpVY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br/>

The [Snapshot GraphQL](https://hub.snapshot.org/graphql) query used in the video:

```
query {
  votes (
    first: 1000,
    skip: 0,
    where: {
      space_in: ["jbdao.eth"],
    },
    orderDirection: desc
  ) {
    voter
  }
}
```

For support, visit [discord.gg/juicebox](http://discord.gg/juicebox).
