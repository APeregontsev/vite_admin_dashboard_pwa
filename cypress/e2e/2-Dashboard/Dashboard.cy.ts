describe(
  "Dashboard",
  {
    viewportHeight: 950,
    viewportWidth: 1250,
  },
  () => {
    // Lets logIn before tests run on Dashboard
    before(() => {
      cy.logIn("othersidesss@gmail.com", "qazwsxedc");
    });

    after(() => {
      // Lets logout for further tests
      cy.logOut();
    });

    it("1. Overview section loaded", () => {
      cy.visit("/");

      // Contains Name of section
      cy.get("h1").should("have.text", "Overview");

      // Contains User Name
      cy.get("div").contains(/Alexander Peregontsev/g);

      // Contains Name of the Chart
      cy.get("div").contains(/Today's trend/g);
    });

    it("2. Todo section loaded", () => {
      // Lets check the initial request
      cy.intercept("GET", "**/todos/?*", (req) => {
        Cypress.log({ displayName: "!!!!!!!!!!!!!! req", message: req.query });
        Cypress.log({ displayName: "!!!!!!!!!!!!!! req_body", message: req.body });

        // lets check the query
        expect(req.query).to.have.keys("_limit", "_page");

        expect(req.query["_limit"]).to.equal("10");
        expect(req.query["_page"]).to.equal("1");

        // Lets check the response

        req.continue((res) => {
          expect(res.body[0].title).to.match(/delectus/gi);
          expect(res.statusCode).to.eql(200);
        });
      }).as("1st_page_todos");

      cy.visit("/");

      cy.get("li span").contains("Todos").click();

      cy.wait("@1st_page_todos");

      cy.get("h1").should("have.text", "Todos");
    });

    it("3. Next page loaded", () => {
      // Lets check the initial request
      cy.intercept("GET", "**todos/?_limit=10&_page=2", (req) => {
        // lets check the query
        expect(req.query).to.have.keys("_limit", "_page");

        expect(req.query["_limit"]).to.equal("10");
        expect(req.query["_page"]).to.equal("2");

        // Lets check the response

        req.continue((res) => {
          expect(res.body[0].title).to.match(/temporibus/gi);
          expect(res.statusCode).to.eql(200);
        });
      }).as("2nd_page_todos");

      cy.visit("/dashboard/todos");

      cy.wait(2000);

      cy.get("button[title='Next page']").click();

      cy.wait("@2nd_page_todos");

      // Lets check necessary row to be present in the table
      cy.get("table")
        .find("tbody tr:first")
        .contains("td", /temporibus dolor/i)
        .should("be.visible");
    });

    it("4. Add todo", () => {
      // Lets check the initial request
      cy.intercept("POST", "**todos/", (req) => {
        // lets check the query

        expect(req.body).to.have.keys("completed", "id", "title", "userId", "modified");

        expect(req.body["completed"]).to.equal(true);
        expect(req.body["title"]).to.equal("new todo");
        expect(req.body["userId"]).to.equal("7");

        // Lets check the response

        req.continue((res) => {
          expect(res.body.userId).to.match(/7/gi);
          expect(res.body.completed).to.match(/true/gi);
          expect(res.body.title).to.match(/new todo/gi);
          expect(res.statusCode).to.eql(201);
        });
      }).as("add_todo");

      cy.visit("/dashboard/todos");

      cy.contains(/\+ Add /gi).click();

      // Lets check if popup is opened
      cy.get("h1").eq(1).should("have.text", "Add todos");

      // Lets add new TODO

      cy.get("select[name='userId']").select("7");
      cy.get("input[name='title']").type("new todo");
      cy.get("select[name='completed']").select("true");

      cy.wait(2000);

      cy.get("button[type='submit']").click();

      // Lets wait API request
      cy.wait("@add_todo");

      // Lets check necessary row to be present in the table
      cy.get("table")
        .find("tbody tr:last")
        .contains("td", /new todo/gi)
        .should("be.visible");
    });

    it("5. Filter Todos", () => {
      cy.visit("/dashboard/todos");

      // Lets apply a filter
      cy.get("span").contains("Filter").click();

      cy.get("input[name='filter']").type("5");
      cy.get("button[type='submit']").click();

      // Lets check filtered Todos

      cy.get("table").find("tbody tr:first").contains("td", "5").should("be.visible");
    });

    it("6. Sorting Todos", () => {
      cy.visit("/dashboard/todos");

      // Lets apply a filter
      cy.get("span").contains("Sort").click();

      cy.get("div").contains("ID").click();

      // Lets check filtered Todos

      cy.get("table").find("tbody tr:first").contains("td", "10").should("be.visible");
    });

    it("7. Mobile View", () => {
      cy.visit("/dashboard/todos");

      cy.viewport(1000, 900);

      // Sidebar should be hidden
      cy.get("aside").should("have.css", "transform", "matrix(1, 0, 0, 1, -255, 0)");

      // Lets press Show-menu button

      cy.get("header svg").eq(0).should("be.visible");

      cy.get("header svg").eq(0).click();

      // Sidebar should be visible
      cy.get("aside").should("have.css", "transform", "matrix(1, 0, 0, 1, 0, 0)");
    });
  }
);

// Lets test Offline

describe("Offline mode", { browser: "!firefox" }, () => {
  // Lets logIn before tests run on Dashboard
  before(() => {
    cy.logIn("othersidesss@gmail.com", "qazwsxedc");
  });

  after(() => {
    // Lets logout for further tests
    cy.logOut();
  });

  it("1. Offline", () => {
    cy.visit("/dashboard/todos");

    const goOffline = () => {
      cy.log("Go offline !!!!")
        .then(() => {
          return Cypress.automation("remote:debugger:protocol", {
            command: "Network.enable",
          });
        })
        .then(() => {
          return Cypress.automation("remote:debugger:protocol", {
            command: "Network.emulateNetworkConditions",
            params: {
              offline: true,
              latency: -1,
              downloadThroughput: -1,
              uploadThroughput: -1,
            },
          });
        });
    };

    const goOnline = () => {
      cy.log("Go online !!!!")
        .then(() => {
          return Cypress.automation("remote:debugger:protocol", {
            command: "Network.emulateNetworkConditions",
            params: {
              offline: false,
              latency: -1,
              downloadThroughput: -1,
              uploadThroughput: -1,
            },
          });
        })
        .then(() => {
          return Cypress.automation("remote:debugger:protocol", {
            command: "Network.disable",
          });
        });
    };

    // Offline label is not present

    cy.get(".check-box-sub-text").should("not.exist");

    cy.wrap(window).its("navigator.onLine").should("be.true");

    cy.get("span").contains("offline").should("not.exist");

    // Offline label is not present
    goOffline();

    cy.get("span").contains("offline").should("exist");

    cy.wait(2000);

    cy.wrap(window).its("navigator.onLine").should("be.false");

    goOnline();
    cy.get("span").contains("offline").should("not.exist");
    cy.wrap(window).its("navigator.onLine").should("be.true");
  });
});
