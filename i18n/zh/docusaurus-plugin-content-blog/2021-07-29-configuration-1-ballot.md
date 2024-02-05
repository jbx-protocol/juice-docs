---
slug: configuration-1-ballot
title: "第一个周期配置： 选票"
authors: [jango]
tags: [governance, dao]
---

JuiceboxDAO 的第一个筹款周期的配置里面包含了一个选票，这个选票把重新配置的通过标准绑定到一个合约上。这个合约则明确了必须在生效前 7 天以上提交重新配置。

按照这个合约的要求，如果重新配置提交时间距离当前（第一个）筹款周期结束小于 7 天，就要等到第 3 个筹款周期才能生效。

任何人都可以通过部署实现[这一接口](https://github.com/jbx-protocol/juice-interface/blob/1c7edfd9a30299a1c9f366f31b0711fc3c11af57/packages/hardhat/contracts/interfaces/IFundingCycleBallot.sol)的合约来编写新选票。部署之后，就可以提交重新配置来把这个新选票应用到以后的重新配置。

我们部署了一个简单的 7 天缓冲选票，既是为了简单化，同时也是为了给社区提供一些防止跑路的保障。我们的目标是逐步设计出一些更好更安全的选票来让所有的 Juicebox 项目来使用。
