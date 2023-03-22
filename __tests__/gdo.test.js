// import supertest module
const request = require("supertest");

// import app from server
const app = require("../server");

// testing for get all projects
test("get all projects under his maintenance", async () => {
  // act
  let res = await request(app)
    .get("/gdo/3/all-projects")
    .set(
      "Authorization",
      "bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMCwidXNlclJvbGUiOiJnZG9IZWFkIiwiaWF0IjoxNjc4NTMwNjM0LCJleHAiOjE2NzkzOTQ2MzR9.RzFr2tJbT5DC5wOPOhT1cCuvpMzT1icVIsooaIh2yk8"
    );

  // assertion
  expect(res.status == 200 || res.status == 204).toBeTruthy();
});

// testing for create resourcing request
test("raise resourcing request", async () => {
  // act
  let res = await request(app)
    .post("/gdo/resource-request")
    .send({
      gdoId: 10,
      projectId: 3,
      requestDescription: "need 5 members to complete project",
    })
    .set(
      "Authorization",
      "bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMCwidXNlclJvbGUiOiJnZG9IZWFkIiwiaWF0IjoxNjc4NTMwNjM0LCJleHAiOjE2NzkzOTQ2MzR9.RzFr2tJbT5DC5wOPOhT1cCuvpMzT1icVIsooaIh2yk8"
    );

  // assertions
  expect(res.status).toBe(201);
});