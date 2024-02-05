---
slug: 23-04-11
title: April 11th, 2023
authors: [zhape]
image: https://docs.juicebox.money/img/townhall.webp
tags: [town-hall]
---

![Town Hall banner by Sage Kellyn](https://docs.juicebox.money/img/townhall.webp)

## Defifa Updates by Jango

We are going to run an NBA Playoff version of Defifa with a relatively short minting session.

There will be some new NFTs that we are trying to play with both the generative art components and some HTML rendered SVGs. And contractually, we're running a similar tournament to NFL, but with an addtion that users can delegate their attestation votes upon minting, so that they can play the game without having to come back later and attest themselves, if they are feeling good about giving that resposibility to someone else, such as the ballkids or some other delegates they trust.

From a front end perspective, we're deploying the game from a new create flow, but there are still a few bugs in the whole process so we're tightening things up and looking to get that out very soon for the tournament.

It's less of a tournament to get high attetion, high traffic or high participation, more in a sense that the NFTs are cool, the tournaments are fun and we're trying some cool new things.

And we're launcing this tournament from a create flow that will be available to everyone else, so anyone can go to create.defifa.net to launch their own tournaments.

## Project Tags Update by Peri

We have officially released project tags lately, which means project owners can select up to 3 tags to associate with their projects.

The benefits of projects tags are as follows:

1. It will show up in the project header and in the search results. It's a nice little additional description that helps adding some context to what the projects are about.
2. People who are searching on the explore page can also filter projects by tags and search for projects in certain categories.
3. It will allow us the surface projects on the landing page or elsewhere in the APP for people to browse.

Except for project tags, our search fuctionality is also enhanced. Insead of searching only by project handles, we can now search for projects by text in their names and description.

## Bananapus Q&A with Jango, Nicholas and other members

### Why L2? What Are The Motivations?

1. Ideally we will get to a point where people can pay a project while incurring less gas, which also means projects can make more of what people pay in. So the priority No.1 is, with payments as the most frequent transaction, how we can make them cheaper.
2. There are also all other kinds of operations, project deployments, reconfigurations and payouts, everything becomes easier and cheaper when running on a non-L1 environment.
3. It's also movivating to be able to address new audiences and communities to build and partner with, in the various L2s where each has its own pocket of life and toolbox.

There wil be a lot of things to think about when considering how Juicebox might run on L2.

Even through the experience in our versioning efforts, we know it's hard to operate with many treasuries, as each treasury is a pocket of funds, they can accpet funds and issue tokens which are only backed by the treasury they are issued from.

Is L2 Juicebox a consideration that solves specific problems that relates to L1 Juicebox protocol, or does L2 just run an instance where people can do the same things from?

We've learned a lot over the past year doing versioning work, with regard to synchronizing and managing various treasuries. It can be expensive and delicate, but if we get it right, it can be a huge blessing that gives us a lot of great affordances. Hopefully with the persistence, we can get there anyways despite the cost and fragility.

Also it will be really delicate to keep things in various treasuries in sync, especially when they are designed to issued the same asset convertible 1:1, just like JBX on our V1, V2 and V3 treasuries. It will get even trickier to include cross-chain assets, bridging and pockets of funding that don't necessarily correlate as neatly.

### The Bus Stop Metaphor

The bridging of assets between L1 and L2s, we can do it in a way like routine bus operations.

We can have a bridging layer which basically waits for people to show up for payments with a certain time box, just like bus stop runs on daily schedules, travel back and forth between L1 and L2s. The bus stop would pay the entirety of gas for these trips, the more people get into this batched chunk, the lower the cost can be distributed across.

And the payments are generally of the same amount, for the same projects, expecting same token outcome. Except that paid by different people, they all look the same, so the L1 project can basically just treat them all as one payload.

Anything happens in the L1 project with beneficiary outcomes, such as distributed project tokens or NFTs or whatever, will get back to L2s with the bus and the payers there can claim their proportional share.

### Trade-offs and benefits

1. The L1 treasury might be operting on timed cycles, and the payment bridging bus could lead to mis-timed operations, so usually bridging operations have some time contraints.
2. L1 treasury could be running with a pay data source that makes it difficult to evenly share an outcome.
3. Project tokens and any assets will necessarily have both L1 and L2 versions, which will be interchangeable only through the bus stop. Assets are taken into custody by the bus stop to issue corresponding L2 version, which will not be backed by any L2 treasury. If tokens are used to vote on Snapshot, how will their L2 version be realted to that?

Filipv thought that a good option might be have mostly independent projects on L1 and L2, but optimizing the payout experience across chains, so that people don't have to have same projects deployed on multiple rollups, rather different projects deployed in various chains but payouts can be done between them. He added that other benefit of this option will have less cognitive burden to understand with existing Juicebox concepts. He also thought that the biggest tradeoff of the bus stop option is to add some extra complexity in our onboarding process.

Jango agreed that the bus stop bridging will be fragile to implement right now. Also he thought it will be more effective to compartmentalized opportunities and risks in communities to empower individuals rather than organizations.

With the fact that we have reserved token issuance and payouts as a function of the protocol, the Bananapus schema is to try to send a reserved JBX allocation to the projects and cohorts of project members in the ecosystem, rather than to the DAO's wallet, dao.jbx.eth, which is currently managed by a multisig. Currently we don't have an affordance to allocate reserved tokens directly to community members, but this operation will be worth experimenting, as it's an incredibly important primitive to develop so as to enable broader governance participation for individuals.

### Priority of L2 operation and L1 protocol improvement

Nicholas pointed out in the town hall the defects of Juicebox protocol as follows:

1. As a self-declared automated programmable treasury protocol, there is actually no solution for distributing payouts to really make life easier for project owners;
2. Juicebox claims to support transparency through pre-programmed on-chain payouts for potential contributors, and delay strategies can be added to let community members prepare for any unfavorable changes, but in practice it tells a different story in this respect;
3. Despite all the modularity in the protocol, in practice people are only paying with ETH, none of the ERC-20 terminals are being used. Although there is the potential for network effect of token swaps and issuance between project paying each other, the reality is that those tokens are not something people have a claim on with their membership.

Nicholas thinks that we should prioritize improving the usability of our protocol, instead of focusing on the expansion into L2 environment where there's not too much demand in there currently.

Jango said that he was interested in experimenting on L2s because there are several projects have this needs and they will benefit from it. And it's very difficult to know ahead of time what is biggest ROI for improvement of our protocol unless people come forth and elucidate their specific needs.

Nicholas reckoned that although reducing gas costs by expanding into L2s is good, it doesn't solve our primary problem which is more in the engagement with audience.  So he suggested that we prioritize improvement of current protocol over expansion into L2s at this stage.

### What Juicebox Is

Jango thinks that Juicebox is a data model on Ethereum that offers a way to model data saved to the Etheruem blockchain. It's nothing without JuiceboxDAO, Peel, WAGMI, ConstitutionDAO, the DAOs that are expressed on top of it. In a sense, it's just the expression of a data model. People are able to express a lot of potential things that are built on top of the protocol, which is defined by a few set of levers that relate to each other.

Jango thinks that the protocol is way more as data layer than a product looking for acceptance.  Our goal is to grow out from the inside, rather than needing to go out and convince other people that this is something they should drop everything to come study. And he's more interested in building with individuals who share the same philosophical principles, than for a specific growth mission.

Nicholas thinks that the protocol needs to be comprehensible and solve specific applications. He thinks the treasury model is not complete and doesn't work for people. Jango argues that Juicebox does solve the treasury dynamic for some people given current tools, but it's up to the project owner to make changes over time. Jango thinks there are a lot of creative ways to manage project owners and solve problems.

### What Bananapus Is

Bananapus is a proposed project with a particular schema trying to make the claim that the most important problems for Juicebox to solve are achieving on-chain governance, or nurturing cross-chain organizations, as well as working to help projects better distribute their tokens to cohorts of other members over time.

Nicholas sees Juicebox as comparable to SAFE or Uniswap, a protocol that has some functionalities and serves a purpose for people. But currently he doesn't see this protocol solves very well as an automated programmable treasury it declares to be, nor does it have any kind of solution for on-chain guaranteed expenditure of assets collected in a fundraise. He feels disappointed that all these issues have been dismissed and not discussed about. Nicholas suggests that the contract crew should prioritize addressing these issues before adding more complexity to the protocol, like expanding into L2s.

Filipv believes that the DAO needs a better way of prioritizing issues because proposals are not an accurate signal of the DAO's interests, especially like this proposal for Bananapus.

Jango thinks we are now at a point where we can afford ourselves creative freedom to figure out how we want to move next, folks can take the tool suite available and propose a narrow application of their choice. The decision of launching the Bananapus project is not a rushed one and it has been under discussions for a while. We have experienced gas price surges when it was unviable to interact with projects, and going forward we probably would see even more proliferation of rollups of chains or application specific chains, it would be nice to do a lot of this heavy legwork of strategizing how Juicebox might play in those worlds.

By submitting the proposal of Bananapus, Jango is trying to suggest our community come together and propose how we might operate on multiple chains, which acknowledging the fact that we won't be able to keep up with it as one organization. We should encourage folks who want to run the protocol on other chains and give them support.

And Jango remains confident that if the protocol is working and proves lasting as a data model, people will want to use it finally. But he's also willing to work together to figure out how to play the prioritization game, and make a deep dive in research.

### Concerns about feedback being neglected

Nicholas expresses his supports for the Bananapus project, but he also points out that there are issues that need to be addressed in our Mainnet protocol, if Juicebox wants to provide the solutions it claims to be available. And also for the protocol to be successful, it needs to have a thriving developer community, but it does seem that we have one except for our contract crew and Jacopo.  He also feels the feedback that the protocol is very difficult to understand should have been incorporated into the protocol architecture discussions for a long while.

Jango says that the protocol is a piece of tooling that has seen evolution and has affordances and flexibilities, there are a lot of decisions to be made along the way, but easy could mean a different thing for different projects running on the protocol. As we have finished the versioning work, we are now in a very good position to determine what are those needs and how we might create the contracts to index the protocol, get information, aggregate them, pocket them together and then serve them to users or develops as they like.

He stands by the hyposthesis that a lot of the stuff wouldn't be usable on our current L1 protocol if it wasn't written or massaged over time. As things start out very simple, we listen to each other's ideas and share each other's concerns, and then things take shape and evolve until we get to a place where we are now. Jango wants to assure that we are not ignoring some need for simplicity, nor do we have the urge to make things complex just because it's a nerdy cool thing to do, nor that we want to go deep into the Solidity cave to have Solidity clout or whatever. We are just pointing to more optimum ways to do things or ways that might be more sound.

Jango admits that there's a lot of work to do, to make things more accessible and simple to folks, but at the very least the philosophy is sound, so we can listen to the needs of folks and try to satisfy them. We don't need to start from scratch, as we have a solid, tested and used code base to build from. He emphasizes that we are not ignoring or overlooking certains needs, there's just been a lot of preconditions and first-order concerns that allows us to even get to the point where we are. It's a long-winded patient effort to get here with a lot of work that has been done, but he's optimistic to take all the feedback into account in whatever we build next.

Nicholas thinks that we were all moving in the same direction towards enabling people to create operational on-chain projects, favoring things that are long enduring, rather than those more successful one time fundraisers, and allow people to use Nance, Blunt and JBM and all these different tools to create projects that last, so that things like open source projects choose to run on Juicebox, because it's advantageous to them and it's worth the 2.5% fees and the administrative overhead because they actually get something from it.

But currently he thinks we should figure out how to actually solve the issues that are existing in the protocol, by paying attention to what devs are thinking, what are their challenges in understanding how the protocol works. He also thinks that the shift to redeploying a protocol that has not achieved developer traction on L1 to L2, the L2 is not going to change the issue of developer traction, and it won't solve the core challenge facing the protocol, where there isn't a really thriving community making use of the protocol itself.

Jango explained that as we've been doing versioning efforts for the past year, it'd be unwise to spend any time in earnest telling people to develop on top of a protocol with looming changes. And he thought we need to either find developers or have people with big ideas and looking for engineering partners. It will take a lot of hard work to both index the world of possible projects that people are looking to build contract for, and leverage JBX as a very simple interface that people can use so that they don't have to hire a front end developer at first.

Up until now, the goal has been safety, stability and getting to a point where things work and are de-risked. The number one goal of JuiceboxDAO is security, only then can we afford ourselves anything else, because now we can build on a solid foundation, climb the ladder confidently knowing that the ladder isn't going to tip over. We're at the a point now where this thing is bolted on, after the versioning work has been finished. We can now tell people with confidence by building projects and documenting the whole thing along the way to create a catalogue of information where people can pull from.

Nicholas thinks that in a way the protocol development is actually very opaque to anyone who is not directly involved, and the decision making that goes into it obviously is expert decision making, but it somehow seems detached from what the rest of the DAO believes to be its operating mission.

He also thinks that there're actually two philosophical approaches in building products in crypto or in software, espcially in crypto.:

1. Approaches that are more focused on creating smaller things, testing them against the market and seeing what achieves traction, and then building more complexity around them. This is also what Juicebox has done to an extent
2. The more grand architectural approaches, which is not a conversation that we have ever had about the style of building that we're doing, what kinds of choices we're making about building, are we making big long term bets about our ability to imagine, what kinds of modularity is required, or do we want to do smaller iterative things and test agaist the market and see what achieves PMF (Product/Market Fit).

Nicholas thinks that what Jango expresses is not so much about PMF, but about having a data layer on the EVM that can be portable and has a lot of expressive potentials.

Jango says that the evolution from V1 to V2, hopefully gets us to a point where future iteration aren't a protocol wide change difference, but pockets that we can test agaist the market with a lot more velocity. He understands that what feels to him like an ongoing conversation may feel to others like an opaque directive without much back and forth. We could always do better with documentation, with sharing things out in town halls, and with prioritizing things in general.

## Opinions of Other Members

**Filipv**: I think this is an important conversation to have and I'm glad you're bringing all of these up, Nicholas. I would like for us to have more hands-on conversations about protocol development, front end development and prioritization and things like that. I find that a lot of time in town halls and Discord, it becomes very philosophical very quickly and very abstract, and I don't know if that's a great tendency for us to have. I love the kind of ideological way we approach things a lot of the time, but I do think at some level we need to be pragmatic when it comes to certain things. I don't think we can ignore the proatical reality of a lot of things, like the developer adoption that Nicholas is mentioning. I would like to have more discussions like this.

**Aeolian**: It doesn't seem to be a shared understanding of what the goal of all these little components are. Does everyone have a shared understanding of what the goal of the protocol actually is? Is the goal to get usage? Or is the goal, like Jango articulate, to just build it in such a way that's very secure and optimized for things to be built on top?

As a JBX holder, when I see this Bananapus proposal, I'm like: How do I evaluate this proposal? What criteria am I using to vote yes in favor of this proposal? Is it going to increase usage on the protocol? Is it going to eventually lead to more revenue, or something totally different? Is it simply that it's going to be a huge cost and a huge effort, but the value that it's going to bring to projects is going to be so grat that it's worth it?  Maybe these things are kind of individual perspectives, but it seems like at a fundamental level there's no shared understanding about what our goal is.

**Filipv**: I think similarly I generally evalutate proposal based on maxmizing the likelihood of long term existence of JuiceboxDAO, so things like security of course are very high. But you also can not get too far in any one direction. Maximizing revenue exraction could kill the cosystem and would be bad for long term existence, but idealistically ignoring revenues and sustainability completely, treasury goes to zero, people stop contributing, then the ecosystem slowly fizzles out. I think a lot of things end up happening in the DAO are not in line with that, so I'm curious to hear how other people evaluate these kinds of things.

**STVG**: I thought from my perspective, most of the things that we used to evaluate proposals with is how are we going to increase usage through Juicebox and generating revenue, so that we can all continue contributing to the DAO. At one point, we were focused on these giant fundraisers, then we started going into the smaller projects, thinking that people could run startups, experiments and things of that nature on Juicebox.

I think I sort of agree and disagree both with Nicholas and Jango. I do think it's an important experiment, but at the same time I also agree that we have a lot of experiments going on right now and it may be time to start looking at our primary function, which is to generate more projects on the protocol with the hopes that it generates more revenues so that we can continue building and be more attractive to the developers and project creators.







