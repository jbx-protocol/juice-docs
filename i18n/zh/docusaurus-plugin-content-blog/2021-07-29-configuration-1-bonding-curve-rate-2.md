---
slug: configuration-1-bonding-curve-rate-2
title: "第一个周期配置：联合曲线比率"
authors: [jango]
tags: [governance, dao]
---

JuiceboxDAO 的第一个周期配置包含一个 60% 的联合曲线比率。

Juicebox 协议里联合曲线的实现可以在[这里](https://github.com/jbx-protocol/juicehouse/blob/1c7edfd9a30299a1c9f366f31b0711fc3c11af57/packages/hardhat/contracts/TerminalV1.sol#L209)查阅代码，以及去[这里](https://www.desmos.com/calculator/sp9ru6zbpk)模拟测试。在这个交互模型里，`o` 是当前的溢出金额、`s` 是当前代币总供应量、`r`是联合曲线比率。`x 轴`显示的是赎回代币数量， 而` y 轴`则是赎回 `x 轴`数量的代币可以获取的溢出金额。

60% 的联合曲线比率意味着每赎回（销毁）一个 JBX 可以获得它对应的 JuiceboxDAO 溢出份额的 0.6 倍多一点。例如，如果你持有 JBX 总供应量的 1%，而溢出总共为 100 个 ETH，那么赎回你持有的全部 JBX 可以得到大概 0.6 个 ETH。

联合曲线比率实际上是形成了一个更长期持有代币的激励机制。联合曲线比率越低就越会放大这个效果。如果没有溢出，则这个曲线没有任何作用。

我们设定的这个 60% 比率多少有些随意 — 我们本来就没有预期会有溢出产生。等有机会研究它在实践中的效果以后，我们应该能对未来筹款周期的配置做出更好的假设。
