---
title: 关于 JBX
sidebar_position: 3
---

## 关于 JuiceboxDAO

Juicebox 协议由 JuiceboxDAO 进行开发。JuiceboxDAO 没有首席执行官，没有人力资源部，也不设董事会；与此相反，它通过 JBX 代币进行自我治理。“DAO” 的意思是*去中心化自治组织* —— 通过代币治理和 Juicebox 平台，JuiceboxDAO 实现了战略决策的管理、工作人员报酬的支付、以及 Juicebox 协议及生态系统的建设。

## JBX 代币的工作原理

$JBX 是 JuiceboxDAO 的*项目代币*。每次有人向 [Juicebox 上的 JuiceboxDAO 项目](https://juicebox.money/@juicebox)付款的时候，都会发行出来新的 JBX 代币，而他们向项目赎回 JBX 代币来获取项目的 ETH 资产时，相应的 JBX 代币则会被销毁。JuiceboxDAO 还会收取[协议费用](https://docs.juicebox.money/dao/jbx/#about-fees)，收到费用时会按同样的机制发行 JBX 代币。

每个 Juicebox 协议版本里，JuiceboxDAO 都是第一个项目。我们当前的项目地址在[这里](https://juicebox.money/@juicebox)，旧的项目地址在[这里](https://juicebox.money/p/juicebox)。旧的 JBX 代币（旧项目的代币）可以[迁移为新的 JBX 代币](https://docs.juicebox.money/zh/blog/jbx-v3-migration-guide/)。

1. JBX 代币合约地址: [`0x4554CC10898f92D45378b98D6D6c2dD54c687Fb2`](https://etherscan.io/token/0x4554CC10898f92D45378b98D6D6c2dD54c687Fb2)[^1]。
2. 旧 JBX 代币合约地址 (已停用): [`0x3abf2a4f8452ccc2cf7b4c1e4663147600646f66`](https://etherscan.io/token/0x3abf2a4f8452ccc2cf7b4c1e4663147600646f66).

每次 JuiceboxDAO 收到付款将发行的 JBX 代币数量由 JBX 在 [Snapshot](https://snapshot.org/#/jbdao.eth/) 上的投票结果来决定，$JBX 持有人赎回代币可以获得的 ETH 数量也是如此。获得投票通过的提案由 DAO 的 [Gnosis Safe 多签](https://app.safe.global/eth:0xAF28bcB48C40dBC86f52D459A6562F658fc94B1e/)负责执行，多签成员同样由 JBX 代币投票选举。我们的完整治理流程可以在[这里](https://docs.juicebox.money/dao/process/)或[这个视频](https://twitter.com/zhape1112/status/1632409175136555008?s=20)来了解 —— 这个流程同样经过 JBX 代币持有人的审议和批准。

## 回购合约

[回购合约](https://snapshot.org/#/jbdao.eth/proposal/0x25dc6459f1c7871326ea5469daef0b237b1e2a8be9631389c703464a25b10346)是在相关提案得到 JBX 代币投票通过后添加到了 JuiceboxDAO 项目上面的。每次 JuiceboxDAO 项目收到付款，这个合约都会检查 Uniswap 上的 JBX 代币价格是否低于项目当前的发行价格。如是，则收到的付款会发送到 Uniswap 来购买代币。

这就意味着，除非 Uniswap 上的交易价格高于项目的发行价格，否则不会再发行新的 JBX 代币。

1. Uniswap 交易池： [ETH - JBX](https://app.uniswap.org/tokens/ethereum/0x4554cc10898f92d45378b98d6d6c2dd54c687fb2).
2. Uniswap 交易池合约地址： [`0xC9a2afE879b5283931DC89Bd27759a12749BCd0C`](https://etherscan.io/address/0xC9a2afE879b5283931DC89Bd27759a12749BCd0C)
3. CoinGecko 的交易池图表： [GeckoTerminal](https://www.geckoterminal.com/eth/pools/0xc9a2afe879b5283931dc89bd27759a12749bcd0c)

## 当前 JuiceboxDAO 项目的各项参数

$JBX 是 JuiceboxDAO 的项目代币。这意味着它的发行、赎回及分配都是由 JuiceboxDAO 项目的各项参数决定的。截止 2023 年 12 月 7 日，项目的具体规则如下：

| 参数                              | 参数的意义                                                   |
| --------------------------------- | ------------------------------------------------------------ |
| **周期长度：** 14 天              | DAO 每 14 天才能更改一次项目的规则。同时它的支出也是以 14 天为周期。 |
| **JBX 发行比率：** 53,804 JBX/ETH | 项目每收到一个 ETH 付款，就会新发行 53804 个 JBX 代币。      |
| **保留代币比率：** 50%            | 新发行的 JBX 代币有 50% 保留给 DAO 的保留代币名单。也就是说，付款人会获得 26902 个 JBX 代币，另外 26902 个 JBX 代由则分配给[JBX 代币选举出来的保留代币受益人](https://juicebox.money/v2/p/1?tabid=tokens)。 |
| **折扣率：** 0.5%                 | 代币的发行比率每个周期（每 14 天）会降低 0.5%。              |
| **赎回比率：** 70%                | JBX 的赎回将按照 70% 的联合曲线比率执行。[^2] |

JuiceboxDAO 的历史项目均已停用。有些信息可能已经过时—— 查看当前的项目配置，请访问 [JuiceboxDAO 的项目页面](https://juicebox.money/@juicebox)。

当前的 JBX 代币持有分布见以下图表 （或到相关的 [Dune](https://dune.com/queries/2331798) 页面查看）

<style>{`iframe {
  width: 100%;
  min-height: 400px;
  display: inline-block;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.wrapper {
  display: grid;
  gap: 20px;
}

`}</style>

<div class="wrapper">
  <iframe src="https://dune.com/embeds/2331798/3817364"/>
  <iframe src="https://dune.com/embeds/2331798/3817394"/>
</div>


## 关于费用

Juicebox 上的所有项目在以下情形需缴纳 2.5% 的费用：

1. 项目向 Juicebox 生态系统以外的钱包地址付款，或者
2. 项目代币持有人从项目赎回资金，且项目的赎回比率设置为低于 100% 时。

请注意：

- 项目接收付款时，不会产生费用。
- 赎回比率设定为 100% 时，赎回不会产生费用。
- Juicebox 项目之间的互相支付行为不会产生费用。

收取的费用将会支付到 JuiceboxDAO 的项目，然后用于在 Uniswap 上购买 JBX 代币，除非发行新 JBX 代币的价格低于 Uniswap 的交易价格。缴纳费用的项目的项目方会收到 50% 的 JBX 代币，剩余 50% 则分配给 JBX 代币选举出来的保留代币受益人。

收费的费率可以在 0% 至 5% 的区间进行设置，由 JBX 治理投票决定具体数字。Juicebox 协议需要治理投票来决定的全局性参数极少，可以在[这里](https://docs.juicebox.money/v4/deprecated/v3/learn/administration/)查看。

项目可以启用[缓缴费用](https://docs.juicebox.money/v4/deprecated/v3/learn/glossary/hold-fees/)的功能来暂时扣起他们支出时需要支付的费用。这一功能适用于项目需要临时向外提取资金，但预计之后可能会把资金退回项目，因此不希望因为资金的进出额外产生费用。

## 预挖代币

JuiceboxDAO 项目的早期阶段，曾预挖了 144246772 个 JBX 代币（旧版本代币），用于支付 Juicebox 协议的前期开发和编译函数库或其他工具的报酬。可以阅读[这篇博客](https://docs.juicebox.money/zh/blog/premine/)来了解此次预挖代币的具体情况。截止 2023 年 12 月 7 日，此次预挖的代币数量占 JBX 代币总发行量约 7.02%。

------

[^1]: V3 JBX 的`总发行量`包含 V1 及 V2 JBX 的发行量。
[^2]: 如需更深入理解这项内容，请访问 [Desmos 网站的联合曲线计算器](https://www.desmos.com/calculator/9pewqesyj5)。计算时，`r = 0.7`。




