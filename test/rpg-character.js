import { html, fixture, expect } from '@open-wc/testing';
import "../github-rpg-contributors.js";

describe("Project1 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <github-rpg-contributors
        title="title"
      ></github-rpg-contributors>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});