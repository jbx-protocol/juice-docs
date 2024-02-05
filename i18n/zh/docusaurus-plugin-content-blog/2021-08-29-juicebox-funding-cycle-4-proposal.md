---
slug: juicebox-funding-cycle-4-proposal
title: "Juicebox：项目情况汇报及 FC4 提案"
authors: [jango]
tags: [governance, dao]
---

第四个筹款周期只需要一些小的改动。所有的重点领域都保持不变，增加一个新的 "协议升级 " 领域。以下是各个领域的情况汇报。

## 重点领域

作为一个DAO，我们应该继续关注以下领域：

### 降低风险

*目标：确保我们做的事情不会归零。*

*当前团队：Jango（主导）、Exekias*

工作汇报：

- 发现一个低严重度 bug, 点击[这里](zh/blog/juicebox-postmortem-of-low-severity-bug-discovered-8-18-2021/)了解事情的前因后果，事后剖析在[这里](https://github.com/jbx-protocol/juice-security/blob/main/incidents/08-18-2021.md)
- 由 DeFiYield 执行的基线审计正在进行中。
- 我们仍需规划一个 bug 赏金计划，对发现的不同严重程度的漏洞给予对应的奖励。

### UX 改进

*目标：改进项目创建流程及项目面板，并制作相关的模板。*

*当前团队：Peri（主导）、Jango、Exekias*

工作汇报：

- 使用 blocknative 添加其他钱包的 Web3 连接支持。[查看这个 PR](https://github.com/jbx-protocol/juice-juicehouse/pull/105)。
- 更新了网站的 "项目 "页面，支持按 "总收入 "排序。
- 每个项目 feed 都增加了一个数据 feed 来查看每个地址捐赠的 ETH 总额。
- 修复了几个 bug。

### 项目支持、教育和文档

*目标：确保 JB 项目获得启动和发展所需的资源。*

*当前团队：Jango（主导）、natimuril、WAGMI 工作室、CanuDAO*

工作汇报：

- 帮助 SharkDAO 启动他们金库代币的一个 AMM 资金池。
- 与有兴趣使用 Juicebox 建立金库的一些项目进行了几次讨论。积极研究 [ScribeDAO](https://twitter.com/scribedao) 和 [Phlote](https://phlote.xyz/) 的解决方案，[FingerprintsDAO](https://twitter.com/FingerprintsDAO)、$Loot 和 NiftyTable 的一个项目也在关注之列。
- 技术或流程文件方面没有重大更新。随着我们对项目和贡献者成功所需条件的进一步理解，我们需要在这方面取得进展。

### 数据分析

*目标：让项目对他们社区金库的状况有深入了解。*

*当前团队：Peri（主导）、buradorii*

工作汇报：

- 在 [juicebox.money](https://juicebox.money/) 的每个项目页面上都添加了一个新的数据 feed，显示每个地址给每个项目的捐款金额。
- 用 Flipside 分析工具制作项目损益图表的工作取得进展。
- 我们尚未给项目提供数据面板。我们仍在努力实现这一目标。

### 流动性池

*目标：在二级市场增加对 JB 金库代币的支持。*

*当前团队：Exekias（主导）、Jango*

工作汇报：

- SharkDAO 的 SHARK 代币已在 Sushiswap 上启动与 ETH 交易对的流动池，你可以在[这里](https://analytics.sushi.com/tokens/0x232afce9f1b3aae7cb408e482e847250843db931)查看分析数据。SharkDAO 的 Juicebox 页面在过渡期间已关闭，计划在未来几天重新开放。
- 正在研究向项目提供一个质押合约来分配流动性奖励。

### 市场

*目标：为 JB 项目提供销售数字商品（及实物？）的场所，销售收入按百分比分配给任意数量的钱包地址及 Juicebox 金库.*

*当前团队：Nicholas（主导）、Jango、Peri*

工作汇报：

- 研究其他协议分割支付的方式。
- 落实我们准备解决的用户流程。
- 开始研究如何构建合约。
- 开始构思 UX 设计。

### 治理

*目标：制定群体决策的方式。*

*当前团队：Zheug（主导）、unicornio*

工作汇报：

- 已创建发起提案、提案投票及决策发布上链时需遵循的流程概要。
- 已创建一个 Coordinape 页面用来试验声誉的分配。
- 治理会议开始在每周二定期举行。

### 协议升级

*目标：增加协议用途，消除金库管理流程的摩擦成本。*

*当前团队：Jango（主导）、Exekias、Peri、Nicholas*

工作汇报：

- TerminalV2 合约开发进展顺利。这一升级将允许项目全面定制自己的金库策略。细节待定，点击[这里](https://github.com/jbx-protocol/juice-juicehouse/tree/version/2)查看具体实现和正在做的测试。
- TerminalV2 将可以修正最近发现的一个边缘案例的 bug，具体请见前面的 “降低风险”。

### 我对于第四周期的提议：

**周期时长：** 14 天（不变）

**选票合约：** 3 天延迟（原 7 天）
重新配置的请示必须在当前筹款周期结束前3天之前提交。原来提前 7 天感觉重新配置的决定时间有些仓促。把选票延迟从 7 天调整为 3 天让我们能有更多时间来评估提案及把变化发布上链。

**折扣率：** 10%
折扣率应该继续以 10% 的比例复合增长，以奖励那些在这个风险阶段继续向 JuiceboxDAO 金库捐款的人。

**联合曲线：** 60% (+-0%)
这项无需更改。这个数值仍然是随意的，但由于目前没有赎回的需求，所以我们在调整折扣率的同时，不妨把这个值保持在偏紧的水平。

**支出：** 共 $33.5k
我建议我们给 exekias、 nicholas、 nati 和 buradorii 支付稍多一些。

**核心贡献者**

- **jango** | *开发 : $10k (没有变化)*
- **peripheralist** | *开发 : $10k (没有变化)*
- **CanuDAO** | *沟通：$2.5k（没有变化）*
- **WAGMI Studios** | *艺术、动画和教育内容：$2.5k（没有变化）*
- **exekias** | *开发: $4k (+ $1k)*
Exekias 对代码的所有方面都亲力亲为。越来越成为核心开发人员不可或缺的一员。

**实验性贡献者**

- **nicholas** | *开发: 2千美元 (+ 500美元) *
nicholas 已开始着手编写代码，他一直是我们社区中的一个活跃分子，帮助推动一些关键的讨论。
- **Nati** | *社区关系：1千美元 (+500美元)*
Nati 已开始引导一些 DAO 加入 Juicebox，同时也帮助推动一些关键的讨论。
- **Buradorii** | *分析：1千美元（+500美元）*
Buradorii 已开始发布一些 Flipside 的数据面板。我们还需要整合图表及提供给项目。

**拨款**

- **Figma**、**Infura**、 **Gitbook**、 **Mee6** 及 **Fleek 的订阅费用** | 500美元

**保留率：** 35% (没有变化)
我们应继续分配 25% 给核心贡献者，同时保留 10% 用于奖励为 ETH/JBX 提供流动性的人（很快）。

**保留的代币分配：**

- **jango：** 35%
- **peripheralist：** 35%
- **CanuDAO：** 10%
- **WAGMI Studios：** 10%
- **exekias：** 7.5%
- **其他杂项：** 2.5% - 用于多签钱包支付的灵活奖励。
