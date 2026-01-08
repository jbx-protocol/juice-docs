---
title: Governance Process
sidebar_position: 4
---

# JBX Decision Process

*JBX's decision process follows a 14 day cycle.*

![](/img/gov-calendar.webp)

#### Decision Schedule

Day 1 -  Temperature Check - Saturday (00:00 UTC) <br/>
Day 4 - Snapshot Vote - Tuesday (00:00 UTC) <br/>
Day 8 - Multisig Execution - Saturday (00:00 UTC) <br/>
Day 12 - Reconfiguration Delay - Wednesday (19:19 UTC) <br/>
Day 15 / Day 1 - Ruleset Updated - Saturday (19:19 UTC) <br/>

#### Step 0 - Discussion

Proposals can be made on [nance.app/s/juicebox](https://nance.app/s/juicebox) at any time. When ready, authors can change a proposal's status from `Draft` to `Discussion` to start a discussion thread in [Juicebox's Discord](https://www.discord.gg/juicebox).

*See [How to Make a Proposal](../proposals) for help.*

#### Step 1 - Temperature Check

`Begins on Day 1 of the Decision Cycle - Saturday 00:00 UTC`

A 3-day Y/N Discord poll (a "temperature check") is made for each proposal submitted by the start of a Decision Cycle. While this poll is active, authors can update or redact their proposals as they get feedback. Verified Discord members with JBX get one vote for each poll. To participate, verify your JBX in [`#🍌｜verify-jbx`](https://discord.gg/juicebox).

Proposals with 10 or more "Y" votes and at least 30% "Y" votes move to Snapshot voting.

#### Step 2 - Snapshot Voting

`Begins on Day 4 of the Governance Cycle - Tuesday 00:00 UTC`

A 4-day For/Against/Abstain [Snapshot](https://snapshot.org/#/jbdao.eth) vote is made for proposals approved by temperature checks. JBX holders get one vote per JBX held for each proposal, and can delegate their voting power on Snapshot.

Proposals with 80,000,000 or more votes (including "Abstain" and "Against" votes) and at least 66% "For" votes (not counting "Abstain" votes) will be implemented.

#### Step 3 - Execution

`Begins on Day 7 of the Decision Cycle - Saturday 00:00 UTC`

The Juicebox counsel's multisig ([`0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e`](https://app.safe.global/home?safe=eth:0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e)) executes approved proposals according to their specifications.

- If approved proposals conflict with each other, more recently approved proposals take priority for the conflicting part. If they were approved at the same time, the proposal with more "For" votes takes priority.
- Proposals are effective when they are approved on Snapshot unless they say otherwise.
- Parts of proposals which are impossible to execute won't be executed.
- The multisig can make small reasonable modifications to a proposal when interpreting it.

The multisig controls the JBX Juicebox project and minimal [Juicebox protocol parameters](https://docs.juicebox.money/dev/v5/learn/administration.md). JBX decision execution depends upon the cooperation of the multisig's elected signers, who have committed to executing the will of the JBX organization as expressed by the Decision Process.

#### Step 4 - Reconfiguration Delay

`Begins on Day 12 of the Decision Cycle - Wednesday 19:19 UTC`

Any changes to JBX's Juicebox project must be submitted at least 3 days before the next cycle starts. This is enforced by the Juicebox protocol. This gives DAO members time to verify queued changes, and to cash out their JBX if desired.
