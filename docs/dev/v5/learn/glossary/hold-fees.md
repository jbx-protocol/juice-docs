# Hold fees

#### What everyone needs to know

* By default, each project on the protocol pays a 2.5% fee of outbound funds down to $NANA (project #1 on the V5 protocol). If the project's ruleset has the `holdFees` flag on, this 2.5% will be set aside (or, "held") but not processed into $NANA. If you then put funds back into your juicebox, the fees being held can be returned to your treasury.
* Held fees are useful for projects that need to use raised funds to buy something, a copy of the U.S. Constitution for example, but might fail and then need to return funds to contributors. In such cases, contributors can be made whole – Juicebox DAO only participates in successful projects. 
* After 28 days, any held fees can be processed. If a project desires holding fees for longer, they must add the funds to the project and then withdraw again – like a "proof-of-funds".

#### What you'll want to know if you're building

* The `holdFees` flag is an option in [`JBRulesetMetadata`](/docs/dev/v5/api/core/structs/JBRulesetMetadata.md), and set when the project is created or a new ruleset is queued. 
