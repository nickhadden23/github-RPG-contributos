import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

export class GithubRpgContributors extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "github-rpg-contributors";
  }

  constructor() {
    super();
    this.items = [];
    this.org = '';
    this.repo = '';
    this.limit = 6; 
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "GitHub RPG Contributors",
    };
  }

  static get properties() {
    return {
      ...super.properties,
      items: { type: Array },
      org: { type: String },
      repo: { type: String },
      limit: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .rpg-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--ddd-spacing-4);
      }
      .character-stuff {
        text-align: center;
        min-width: 176px;
      }
      .contdetails {
        display: flex;
        flex-direction: column;
        margin: var(--ddd-spacing-2);
      }
      .header {
        text-align: center;
        margin: 0 auto;
      }
      a {
        text-decoration: none;
        color: var(--ddd-theme-default-link);
      }
      a:hover {
        text-decoration: underline;
      }
    `];
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('org') || changedProperties.has('repo')) {
      this.getData();
    }
  }

  async getData() {
    if (!this.org || !this.repo) return;

    const url = `https://api.github.com/repos/${this.org}/${this.repo}/contributors`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        this.items = data.slice(0, this.limit); 
      } else {
        this.items = [];
      }
    } catch (error) {
      console.error("Error fetching contributors:", error);
      this.items = [];
    }
  }

  render() {
    return html`
      <div class="header">
        <h3>GitHub Repo: <a href="https://github.com/${this.org}/${this.repo}">${this.org}/${this.repo}</a></h3>
      </div>
      <div class="rpg-wrapper">
        ${this.items.map((item) => html`
          <div class="character-stuff">
            <rpg-character seed="${item.login}"></rpg-character>
            <div class="contdetails">
              <a href="https://github.com/${item.login}" target="_blank">${item.login}</a>
              <span>Contributions: ${item.contributions}</span>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(GithubRpgContributors.tag, GithubRpgContributors);