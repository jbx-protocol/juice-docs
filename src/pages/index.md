---
title: Home
hide_table_of_contents: true
---

<div class="hero hero--secondary" >
  <div class="container">
    <div class="row" style={{maxWidth: "800px", margin: "auto"}}>
      <div class="col col--5">
        <img src="/img/site/hero-banny.svg" className="hero-img"/>
      </div>
      <div class="col col--7">
        <h1 style={{fontSize: "3.7rem", color: "var(--ifm-heading-color)"}}>Juice Docs</h1>
        <p style={{fontSize: "2rem"}}>Fund your thing.</p>
        <a class="button button--primary" href="/user/" style={{marginBottom: "5px"}}>Start learning</a>
        <a class="button button--link" href="https://juicebox.money/contact" style={{marginBottom: "5px", paddingLeft: "calc(var(--ifm-button-padding-horizontal) * var(--ifm-button-size-multiplier) * 0.5)"}}>Contact onboarding →</a>
      </div>
    </div>
  </div>
</div>

<style>{`
  .hero-img{
    max-height: 250px;
  }
  @media screen and (max-width: 997px) {
    .hero-img{
      display: none;
    }
  }

  h3 {
	color: var(--ifm-font-color-base)
  }
`}</style>

<div class="container" style={{marginTop: "30px"}}>
  <div class="row">
    <div class="col col--4">
      <div class="card" style={{marginBottom: "30px"}}>
        <div class="card__header">
          <h3>For Developers</h3>
        </div>
        <div class="card__body">
          <p>
            Learn about the smart contracts that power the Juicebox protocol.
          </p>
        </div>
        <div class="card__footer">
          <a class="button button--primary button--block" href="/v4">Docs →</a>
        </div>
      </div>
    </div>
    <div class="col col--4">
      <div class="card" style={{marginBottom: "30px"}}>
        <div class="card__header">
          <h3>For Project Creators</h3>
        </div>
        <div class="card__body">
          <p>
            How to fund your thing with Juicebox. Join
            the <a href="https://discord.gg/juicebox">Discord</a> for more help!
          </p>
        </div>
        <div class="card__footer">
          <a class="button button--primary button--block" href="/user">Project Creators →</a>
        </div>
      </div>
    </div>
    <div class="col col--4">
      <div class="card" style={{marginBottom: "30px"}}>
        <div class="card__header">
          <h3>About JuiceboxDAO and $JBX</h3>
        </div>
        <div class="card__body">
          <p>
            Learn about $JBX and the DAO building
            Juicebox.
          </p>
        </div>
        <div class="card__footer">
          <a class="button button--primary button--block" href="/dao">JuiceboxDAO →</a>
        </div>
      </div>
    </div>
  </div>
</div>

<footer class="footer">
  <div class="container container--fluid">
    <div class="footer__links">
      <a class="footer__link-item" href="https://juicebox.money/contact">Contact</a>
      <span class="footer__link-separator">&middot;</span>
      <a class="footer__link-item" href="https://discord.gg/juicebox">Discord</a>
      <span class="footer__link-separator">&middot;</span>
      <a class="footer__link-item" href="https://github.com/jbx-protocol">GitHub</a>
      <span class="footer__link-separator">&middot;</span>
      <a class="footer__link-item" href="/user/brand-kit/">Brand Kit</a>
      <span class="footer__link-separator">&middot;</span>
      <a class="footer__link-item" href="/dao/contribute/">Contribute</a>
      <span class="footer__link-separator">&middot;</span>
      <a class="footer__link-item" href="/tos/">Terms of Service</a>
    </div>
    <div>Made by <a href="https://juicebox.money/p/juicebox">JuiceboxDAO</a></div>
  </div>
</footer>
