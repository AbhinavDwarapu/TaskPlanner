/* eslint-disable cypress/no-unnecessary-waiting */

const workTime = "45 00";
const breakTime = "25 00";

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
      cy.get("div[id=TimeView]").contains("44 59");
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
      cy.get("div[id=TimeView]").contains("24 59");
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

describe("Check Settings Module", () => {
  it("Valid Test: Open Settings Modal", () => {
    cy.get("Button[id=SettingsButton]").click();
  });
  it("Valid Test: Change Timer Settings", () => {
    cy.get("div[id=SettingsModal]").within(() => {
      cy.get("input[id=timerMinutes]").type("{backspace}{backspace}12");
      cy.get("input[id=timerSeconds]").type("{backspace}{backspace}12");
      cy.get("button[id=SaveSettingsButton]").click();
    });
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains("12 12");
    });
  });
  it("Valid Test: Change Break Settings", () => {
    cy.get("Button[id=SettingsButton]").click();
    cy.get("div[id=SettingsModal]").within(() => {
      cy.get("input[id=breakMinutes]").type("{backspace}{backspace}12");
      cy.get("input[id=breakSeconds]").type("{backspace}{backspace}12");
      cy.get("button[id=SaveSettingsButton]").click();
    });
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=SegmentControl]").contains("Break").click();
      cy.get("div[id=TimeView]").contains("12 12");
    });
  });
  it("Valid Test: Delete All Tasks", () => {
    for (let i = 0; i < 3; i += 1) {
      cy.get("#CreateTaskButton").click();
      cy.get("div[id=NewTaskModal]").within(() => {
        cy.get("input").eq(0).type("New Test Task");
        cy.get("textarea").eq(0).type("New Test Description");
        cy.get("Button").contains("Create Task").click();
      });
    }

    cy.get("Button[id=SettingsButton]").click();
    cy.get("div[id=SettingsModal]").within(() => {
      cy.get("button[id=DeleteTasks]").type("{backspace}{backspace}12");
      cy.get("button[id=SaveSettingsButton]").click();
    });
    cy.get("div[id=TaskContainerBox").within(() => {
      cy.get("div[id=TaskPanel]").should("not.exist");
    });
  });
  it("Valid Test: Reset Settings to Default", () => {
    cy.get("Button[id=SettingsButton]").click();
    cy.get("div[id=SettingsModal]").within(() => {
      cy.get("input[id=timerMinutes]").type("{backspace}{backspace}12");
      cy.get("input[id=timerSeconds]").type("{backspace}{backspace}12");
      cy.get("input[id=breakMinutes]").type("{backspace}{backspace}12");
      cy.get("input[id=breakSeconds]").type("{backspace}{backspace}12");
      cy.get("input[id=Notif]").uncheck();
      cy.get("button[id=Reset]").click();
    });
    cy.get("Button[id=SettingsButton]").click();
    cy.get("div[id=SettingsModal]").within(() => {
      cy.get("input[id=timerMinutes]").should("have.value", "45");
      cy.get("input[id=timerSeconds]").should("have.value", "0");
      cy.get("input[id=breakMinutes]").should("have.value", "25");
      cy.get("input[id=breakSeconds]").should("have.value", "0");
      cy.get("input[id=Notif]").should("have.value", "on");
      cy.get(".mantine-ActionIcon-hover").click();
    });
  });
  it("Invalid Test: Set Timer Minutes to Negative Values", () => {
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=timerMinutes]").type("{backspace}{backspace}-1");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=timerMinutes]").type("{backspace}{backspace}-10");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
  it("Invalid Test: Set Timer Minutes to Over 99", () => {
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=timerMinutes]").type("{backspace}{backspace}100");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=timerMinutes]").type("{backspace}{backspace}1000");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
  it("Invalid Test: Set Timer Seconds to Negative Values", () => {
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=timerSeconds]").type("{backspace}{backspace}-1");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=timerSeconds]").type("{backspace}{backspace}-10");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
  it("Invalid Test: Set Timer Minutes to Over 59", () => {
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=timerSeconds]").type("{backspace}{backspace}60");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=timerSeconds]").type("{backspace}{backspace}1000");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });

  it("Invalid Test: Set Break Minutes to Negative Values", () => {
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=breakMinutes]").type("{backspace}{backspace}-1");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=breakMinutes]").type("{backspace}{backspace}-10");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
  it("Invalid Test: Set Break Minutes to Over 99", () => {
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=breakMinutes]").type("{backspace}{backspace}100");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=breakMinutes]").type("{backspace}{backspace}1000");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
  it("Invalid Test: Set Break Seconds to Negative Values", () => {
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=breakSeconds]").type("{backspace}{backspace}-1");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=breakSeconds]").type("{backspace}{backspace}-10");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
  it("Invalid Test: Set Break Minutes to Over 59", () => {
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=breakSeconds]").type("{backspace}{backspace}60");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
    cy.get("Button[id=SettingsButton]").click();
    cy.get("input[id=breakSeconds]").type("{backspace}{backspace}1000");
    cy.get("button[id=SaveSettingsButton]").click();
    cy.get("div[id=TimerModuleBox]").within(() => {
      cy.get("div[id=TimeView]").contains(workTime);
    });
  });
});

export {};
