/* eslint-disable cypress/no-unnecessary-waiting */

const workTime = 45;
const breakTime = 25;

describe("Check Link", () => {
  it("Valid Test: Timer Page Exists", () => {
    cy.visit("http://localhost:3000/timer");
    cy.url().should("include", "/timer");
  });
});

describe("Check Timer Module", () => {
  it("Valid Test: Time Changes When Segment Clicked", () => {
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=SegmentControl]").contains("Break").click();
      cy.get("div[id=TimeView]").contains(breakTime);
      cy.get("div[id=SegmentControl]").contains("Timer").click();
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
  it("Valid Test: Play/Pause and Reset Buttons Work for Timer", () => {
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("Button").eq(0).click();
      cy.wait(1200);
      cy.get("Button").eq(0).click();
      cy.get("div[id=TimeView]").contains(workTime - 1);
      cy.get("Button").eq(1).click();
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
  it("Valid Test: Play/Pause and Reset Buttons Work for Break", () => {
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=SegmentControl]").contains("Break").click();
      cy.get("Button").eq(0).click();
      cy.wait(1200);
      cy.get("Button").eq(0).click();
      cy.get("div[id=TimeView]").contains(breakTime - 1);
      cy.get("Button").eq(1).click();
      cy.get("div[id=TimeView]").contains(breakTime);
    });
  });
  it("Segment Button Resets Timer Even if Playing", () => {
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=SegmentControl]").contains("Break").click();
      cy.get("Button").eq(0).click();

      cy.wait(1200);
      cy.get("div[id=SegmentControl]").contains("Timer").click();
      cy.wait(1200);
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
});

export {};
