---
slug: v3-jbx-postmortem
title: V3 JBX 部署 bug 之事后剖析
authors: [jango]
tags: [protocol, update]
---

最后更新于北京时间 2023 年 1 月 28 日 3:33 AM。

V3 JBX 代币部署出现了一个 bug, 导致了保留代币的超额发行。这个 bug 在发现之前并没有被恶意利用，已经按照 [JBX 紧急程序](https://docs.juicebox.money/dao/security/emergency/)得到妥善处理。

严重程度：高

目前状态：已处理

### 总结

北京时间 2023 年 1 月 26 日 12 点 19 分，Jango 发现 JuiceboxDAO V3 金库存在2,086,888,439.481608634942732443 个保留 JBX 代币可被铸造出来。这个情况是在 V3 JBX 部署并附加到 JuiceboxDAO V3 金库数小时之后发生的。

当时建议的行动方案是由 JuiceboxDAO 多签来履行其 [JBX 紧急程序](https://docs.juicebox.money/dao/security/emergency/)上订明的职责，把保留代币改为全部分配给 dao.jbx.eth 钱包，把超额的保留代币分配到该钱包，然后把这些超额代币销毁掉。

保留代币分配对象设定的交易：https://etherscan.io/tx/0x4a0e8e84cce8674a28255b038cf1f82e6de235543e3e90c6f950bbfdd2d27f18 。

超额保留代币转到 dao.jbx.eth 后执行销毁的交易：https://etherscan.io/tx/0x57ba0b44d57de2a4a19a45917a8245c8d02e999f1e843087665039186ac89460 。

### 影响对象

如果你属于某个 Juicebox 项目，你没有受到影响。如果你的项目在 V1 协议运行，由于 V1 协议将不再发行 JBX，你的项目提取金库资金将不再需要缴纳 JBX 成员费用。

如果你是一名 DAO 贡献者，你至少 2 周，甚至 4 周（两个治理周期）时间内不会获得保留代币的分配。

如果你是一位 JBX 持有人，V3 金库开放赎回的时间将可能会延后 4 周（两个治理周期）。

如果你是一位 DAO 的多签成员，你可能需要负责排队、复核及执行销毁由于 V1 和 V2 发行累积到 V3 金库的多余保留代币的交易。

### 描述

V3 JBX 在计算其总供应量时会把 V1 及 V2 的代币余额考虑在内。V3 的 JB 控制器（0xFFdD70C318915879d5192e8a0dcbFcB0285b3C98）用项目代币的总供应量及其追踪属性，来计算目前未铸造保留代币的发行量。追踪属性在 V3 代币签发时没有进行更新，由于它是一个内部属性，只能在分发当前未分配保留代币后才能更新。因此，V3 JBX 代币的部署设计是存在缺陷的。这个缺陷在测试套件、内部审查或者外部审计中都没有被发现。

### 发现

这个 bug 由 Jango 于北京时间 2023 年 1 月 26 日 12 点 19 分发现并向 JuiceboxDAO 电报群报告，在 JuiceboxDAO 多签通过[这个交易](https://etherscan.io/tx/0x66772bc33f6dc3555edbe3564501470dac01e956831535c31ce70ae44b6b5f63)部署 JBX V3 代币并把它附加到 V3 金库之后的 14 个小时零 11 分钟。Jango 查看 juicebox.money/@juicebox 的 JuiceboxDAO V3 项目页面，留意到可疑的待分配保留代币数量，并因此发现这个 bug。发现这个 bug 的时侯，保留代币的分配对象指向 DAO 通过提案确定的一个接收名单。如果当时超额保留代币分配出去的话，每个保留代币接收人都会获得一部分不属于他们的 JBX 代币。

Jango 立即意识到问题的成因，并在报告 bug 的原始消息里做了记录。

如果 JuiceboxDAO 有一个可能受到新组件影响函数的检查单，这个 bug 极有可能在部署 V3 JBX 代币就能够发现。

### 应对

除非明确锁定，否则项目方是可以改变某个筹款周期保留代币率下的保留代币分配的。由于原保留代币的分配名单没有锁定，Jango 提出解决方案并按照 [JBX 紧急程序](https://docs.juicebox.money/dao/security/emergency/)得到一致同意，把保留代币的分配全部转到 dao.jbx.eth 的多签钱包。这个操作必须在其他人发起公开交易把待分配保留代币分发给当前的接收人名单前完成。然后多签就会在下一个交易中完成多余代币的销毁工作。

接下来的一个小时里，多签成员被召集来复核当前形势及方案提议，并由 Juicebox.money 的网站管理员停止分发交易功能，以免保留代币被分发给 JuiceboxDAO 的保留代币受益人。

把保留代币的分配目标 100% 转给 dao.jbx.eth 的交易由 jango.eth 于北京时间 2023 年 1 月 26 日 12 :51:43 PM 发起，并由 peri.eth 于 2023 年 1 月 26 日 13 :48:11 PM 执行：https://etherscan.io/tx/0x4a0e8e84cce8674a28255b038cf1f82e6de235543e3e90c6f950bbfdd2d27f18。

把超额保留代币分配给保留代币受益人的公开交易由 aeolian.eth 于2023 年 1 月 26 日 13 :58:59 PM 执行： https://etherscan.io/tx/0x4a0e8e84cce8674a28255b038cf1f82e6de235543e3e90c6f950bbfdd2d27f18。

将分配到 dao.jbx.eth 的部分保留代币销毁的交易由 jango.eth 于 2023 年 1 月 26 日 14 :11:36 PM 发起，并由 jbx.filipv.eth 于2023 年 1 月 26 日 16 :58:23 PM 执行：https://etherscan.io/tx/0x57ba0b44d57de2a4a19a45917a8245c8d02e999f1e843087665039186ac89460 。

### 恢复

经过多签成员们的有效应对之后，金库暂没有即时风险或者需要恢复的资产。

但是，DAO 仍需采取一些步骤来恢复其 V3 金库的原保留代币受益人名单。按目前的情况，新发行的 JuiceboxDAO V1 及 V2 金库代币会继续增加 V3 JBX 的总供应量，从而继续增加多签必须相应销毁的超额保留代币，直到这些步骤完成。通过一系列的筹款周期配置及在合适的时机进行控制器迁移，就可以全部完成这些步骤。

采取这些步骤的主要目的是防止 JuiceboxDAO V3 金库出现计划外的保留代币，以下是实现这一目的的三种已知方案，各有利弊。

1. 停止发行 DAO 的 V1 及 V2 金库代币。缺点是我们将不能再使用这些金库来进行互相配合及继续收费。
2. 停止 DAO V1 金库的代币尾，但保持 V2 金库开放，把保留率配置为 0 并降低发行比率。这样是可行的，因为 V2 金库允许项目方公开设定定制的发行比率，而 V1 只能通过折扣率来调整发行比率。
3. 保持 DAO 的 V1 及 V2 开放，选择通过升级 DAO 的 V3 控制器改善及加强保留代币的计算方法来解决这个问题。缺点是需要优先实现客户端支持来配合新的 V3.1 版本控制器的使用，同时还会引入另一个需要部署审核的组件。通过这次事后剖析，我们很可能近期会选择升级 V3.1 控制器，但并不算是一个很紧急的需要。

选项 2 及选项 3 是互相排斥的。如果选择第 2 个选项，我们需要重新评估 V2 金库策略和未来的 V3.1 JB 控制器。

以下是采取选项 2 的实施步骤，A）调整 JuiceboxDAO V2 金库的代币发行率，及 B）完全停止 JuiceboxDAO V1 金库：

#### 选项 2

A.

1. 在某个筹款周期把 V2 金库的保留率调整为 0%。V2 金库的发行比率应相应调整至向付款人发行跟之前相同的代币数量。JuiceboxDAO 的保留代币受益人仍将收到 V2 的保留代币分配，但会直接在 V3 上接收。

B)

1. V1 的发行率不能直接设定，只能通过调整折扣率。因此 V1 的代币发行需要完全停止。要实现这个，JuiceboxDAO 需要把 V1 付款终端迁移到 V1.1，因为 V1.1 才能接收筹款周期元数据指示暂停付款的旗标。
2. 在将来某个筹款周期设置元数据旗标，打开暂停付款。
3. JuiceboxDAO 应发起交易把 V1 付款终端和 V1.1 付款终端的费用调整为 0%。要继续支持 V1 项目分发资金必须这样调整，因为如果项目向暂停付款的金库缴纳费用会导致交易回滚。

或者如果我们采取选项 3 的话，将实施以下步骤：

#### 选项 3

1. 安排一个筹款周期来支持控制器迁移。

2. JuiceboxDAO 应发起一个交易把控制器从 V3 迁移到 V3.1。

   使用 V3.1 控制器的其他项目也可以安全地使用之前出 bug 的同一个代币部署器，而且由于数据存储更明确，整个协议范围内的保留代币风险也将得到解决。

   更抽象地说，这个 V3.1 控制器重新检查了保留代币计算的设计方案。目前的设计方案优先考虑向项目付款时的尽可能低成本，缺点是保留代币的发行量计算基于待发行代币供应量 ，以及有一个内部追踪属性要在当前保留代币发放后才会重置。节省付款成本的考虑不值得以更明确更低依赖性的保留代币供应量计算为代价，况且这个节省的成本本来就不是太过清晰。不管怎样，我们将来都会考虑采用 V3.1 控制器，问题只在于是否要优先到现在来做，顺便把这个 bug 引发的即时需求也解决掉。

不管是采取选项 2 或者选项 3， 完成之后，原 V3 金库的保留代币分配将会得到恢复。

### 可付诸实施的经验教训

1. 很明显，我们在批准新组件的部署时，需要有一个更加严格的跨协议机制视角的检查清单。我们必须在审核代码时考虑更多引入的新组件与核心机制发生冲突的可能性。我们需要把这一机制集成到全面的正式化的 ”开发人员安全操作“之中，这是一个我们可能还没有注意到的开发操作模式。
2. 我们应该重新评估在高频交易成本与低概率意外行为影响之间做出的付款终端和控制器的取舍。文档并不总能表述出全部的风险，有时更应该以高日常运营成本为代价来杜绝一些具破坏性的影响。这个问题没有放之四海而皆准的答案，需要因地制宜 -- 我们首先要针对自身具体的情况来量化这些风险。
3. 我们本不应该鼓励那些负责 V3 JBX 的实施、审核和测试的人来兼顾其他更为表面的想法和需求。V3 JBX 的合约和概念非常简单，所以我们开发其他产品及支持 DAO 生态系统其他的发展时，在互相审核和外部审计的问题上有些随意。在同时开发多个看似简单的代码产品（”外围“或”扩展“合约）时，我们应该留意我们正在造成一个高冲突可能性的环境。比方说，即使极边缘合约缺陷暴露的漏洞，也可能会引发一个无限铸造的 bug，从而最终造成资金的损失。我们需要一视同仁地像对待 V3 的”核心“合约一样保持严苛的态度。因此，减少同时执行的任务并进行精细化管理是前提，所谓慢工出细活。
4.  DAO 的工作风格最近演变成没有明确权责归属的代码共同负责制，鼓励贡献者们同时参与多个工作项目。让更多人来审查一段代码固然有巨大的价值，但我们应该通过行动来重新平衡我们的工作文化，为每个个体创造对特定项目潜心钻研的空间，以及明确各人对每个优先项目或试验的结果的权责。有些时候固然应该鼓励关注当前最新的想法，但也有些时候我们应该鼓励对未兑现承诺的全心投入。
5. 金库间的可协同性可能会暴露出弊大于利的风险。如果我们在引入 V3 JBX 前就决定完全停止 V1 和 V2 金库的代币发行，我们本不需要引入辅助代币迁移的组件，这次的 bug 也不会发生。在设计这次 V3 JBX 部署策略的时候，尽管 V1 和 V2 的分配规模相对较小，之所以还是做出这样的选择，其实是要内部解决协同性问题，来为将来可能会出现的迁移到新协议版本时更高风险的协同性问题进行一次预演。