// import supertest module
const request = require("supertest");

// import app from server
const app = require("../server");

// login
test("user login", async () => {
  // act
  let response = await request(app).post("/user/user/login").send({
    email: "ravi@westagilelab.com",
    password: "ravi",
  });

  // assertions
  expect(response.body).toHaveProperty("payload");
});

// testing admin

// testing get all the projects
test("Get all projects by admin", async () => {
  // arrange
  // act
  let response = await request(app)
    .get("/specialUser/all-projects")
    .set(
      "Authorization",
      "BEARER" +
        " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMywidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODUzMDcxMSwiZXhwIjoxNjc5Mzk0NzExfQ.sPAojMx1m1J8PhPIbf-1MktYQCfUzP_o1PSYOzA9XIE"
    );

  // assertions
  expect(response.body.payload.length).toBeGreaterThan(0);
});

// creating project test
test("/special-user/create-project", async () => {
  // arrange
  // act
  let response = await request(app)
    .post("/admin-api/admin/project")
    .send({
      projectName: "testdummy",
      client: 1002,
      gdoId: 100,
      projectManager: 101,
      hrManager: 102,
      clientAccountManager: "dummy",
      statusOfProject: "In progress",
      startDate: "2023/03/09",
      endDate: "2023/12/12",
      overAllProjectFitnessIndicator: "Green",
      domain: "Fullstack",
      typeOfProject: "Development",
    })
    .set(
      "Authorization",
      "BEARER " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMywidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODUzMDcxMSwiZXhwIjoxNjc5Mzk0NzExfQ.sPAojMx1m1J8PhPIbf-1MktYQCfUzP_o1PSYOzA9XIE"
    );

  // assertion
  expect(response.status).toBe(201);
});
