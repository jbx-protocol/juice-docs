---
sidebar_position: 6
---
# Change Log

### Dec 19, 2025 - JBRulesets5_1, JBMultiTerminal5_1, JBTerminalStore5_1, JBController5_1, JBTiered721Hook5_1, JBTiered721HookDeployer5_1, JBTiered721HookProject5_1, JBOmnichainDeployer5_1

There is a bug in JBRulesets affecting the approval hook, which adds thresholds to if/when queued ruleset can be scheduled to begin. JBRulesets5_1 has a one-line fix. A new JBRulesets contract means a new JBController, JBMultiTerminal, JBTerminalStore, JBTiered721Hook, JBTiered721HookDeployer, JBTiered721HookProjectDeployer, and JBOmnichainDeployer need to be deployed for new projects to use.

We will continue with the assumption that current projects may have disfunctional approval hooks, and new projects can use the updated contracts to have approval hooks working as intended. If current projects wish to migrate to the new contracts, they should do so carefully as they'll be moving onto a fresh ruleset chain.

Revnets are unafected as they do not make use of the approval hook, and will continue to use the original contracts. 

See this post for context: https://jango.eth.sucks/39682963-EFF4-4722-B809-3870695D628F/
