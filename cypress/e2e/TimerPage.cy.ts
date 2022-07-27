/* eslint-disable cypress/no-unnecessary-waiting */

const workTime = 45;
const breakTime = 25;

describe("Check Link", () => {
  it("Valid Test: Timer Page Exists", () => {
    cy.visit("http://localhost:3000");
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
  it("Valid Test: Segment Button Resets Timer Even if Playing", () => {
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=SegmentControl]").contains("Break").click();
      cy.get("Button").eq(0).click();

      cy.wait(1200);
      cy.get("div[id=SegmentControl]").contains("Timer").click();
      cy.wait(1200);
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
  it("Invalid Test: Clicking Same Segment Should Not Change Time", () => {
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=SegmentControl]").contains("Timer").click();
      cy.get("div[id=SegmentControl]").contains("Timer").click();
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
  it("Invalid Test: Clicking Same Segment Should Not Change Time", () => {
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=SegmentControl]").contains("Break").click();
      cy.get("div[id=SegmentControl]").contains("Break").click();
      cy.get("div[id=TimeView]").contains(breakTime);
    });
  });
});

describe("Check Task Module", () => {
  it("Invalid Test: New Task Without Title", () => {
    cy.get("#CreateTaskButton").click();

    cy.get("div[id=NewTaskModal]").within(() => {
      cy.get("textarea").eq(0).type("New Test Description");
      cy.get("Button").contains("Create Task").click();
    });
    cy.get("div[id=NewTaskModal]").should("exist");
  });
  it("Valid Test: Close New Task Modal", () => {
    // cy.get("#CreateTaskButton").click();

    cy.get("div[id=NewTaskModal]").within(() => {
      cy.get("Button").eq(0).click();
    });
  });
  it("Valid Test: Create New Task With All Optionals", () => {
    cy.get("#CreateTaskButton").click();

    cy.get("div[id=NewTaskModal]").within(() => {
      cy.get("input").eq(0).type("New Test Task");
      cy.get("textarea").eq(0).type("New Test Description");
      cy.get("Button").contains("Create Task").click();
    });
    cy.get("div[id=TaskContainerBox").within(() => {
      cy.get("div[id=TaskPanel]").within(() => {
        cy.get("div[id=TaskTime]").contains("At");
        cy.get("div[id=TaskDate]").contains(",");
      });
    });
  });
  //
  it("Valid Test: Complete/Uncomplete Task", () => {
    cy.get("#CreateTaskButton").click();

    cy.get("div[id=NewTaskModal]").within(() => {
      cy.get("input").eq(0).type("New Test Task");
      cy.get("textarea").eq(0).type("New Test Description");
      cy.get("Button").contains("Create Task").click();
    });
    cy.get("div[id=TaskContainerBox").within(() => {
      cy.get("div[id=TaskPanel]").within(() => {
        cy.get("div[id=TaskTime]").contains("At");
        cy.get("div[id=TaskDate]").contains(",");
      });
    });

    cy.get("div[id=TaskPanel]").within(() => {
      cy.get("Button").eq(0).click();
      cy.get("div[id=TaskName]")
        .should("have.css", "text-decoration")
        .and("include", "line-through");
    });
    cy.get("div[id=TaskPanel]").within(() => {
      cy.get("Button").eq(0).click();
      cy.get("div[id=TaskName]")
        .should("have.css", "text-decoration")
        .and("not.include", "line-through");
    });
  });

  it("Valid Test: Delete Task", () => {
    cy.get("#CreateTaskButton").click();

    cy.get("div[id=NewTaskModal]").within(() => {
      cy.get("input").eq(0).type("New Test Task");
      cy.get("textarea").eq(0).type("New Test Description");
      cy.get("Button").contains("Create Task").click();
    });
    cy.get("div[id=TaskContainerBox").within(() => {
      cy.get("div[id=TaskPanel]").within(() => {
        cy.get("div[id=TaskTime]").contains("At");
        cy.get("div[id=TaskDate]").contains(",");
      });
    });
    cy.get("div[id=TaskPanel]")
      .eq(0)
      .within(() => {
        cy.get("Button").eq(1).click();
      });
    cy.get("div[id=TaskContainerBox").within(() => {
      cy.get("div[id=TaskPanel]").should("not.exist");
    });
  });
  it("Valid Test: New Task Without Time", () => {
    cy.get("#CreateTaskButton").click();

    cy.get("div[id=NewTaskModal]").within(() => {
      cy.get("input").eq(0).type("New Test Task");
      cy.get("textarea").eq(0).type("New Test Description");
      cy.get("Button").eq(1).click();
      cy.get("Button").contains("Create Task").click();
    });
    cy.get("div[id=TaskContainerBox").within(() => {
      cy.get("div[id=TaskPanel]").within(() => {
        cy.get("div[id=TaskTime]").should("have.value", "");
      });
    });
  });
  it("Valid Test: New Task Without Date", () => {
    cy.get("#CreateTaskButton").click();

    cy.get("div[id=NewTaskModal]").within(() => {
      cy.get("input").eq(0).type("New Test Task");
      cy.get("textarea").eq(0).type("New Test Description");
      cy.get("Button").eq(2).click();
      cy.get("Button").contains("Create Task").click();
    });
    cy.get("div[id=TaskContainerBox").within(() => {
      cy.get("div[id=TaskPanel]").within(() => {
        cy.get("div[id=TaskTime]").should("have.value", "");
      });
    });
  });
});

export {};
