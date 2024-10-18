const { test, expect } = require("playwright/test");
const { Ajv } = require("Ajv");

const ajv = new Ajv();

test('TC-4 PUT Object', async ({ request }) => {

  const body = {
    "name": "John Doe",
    "job": "Developer"
  }

  const response = await request.put('https://reqres.in/api/users/2', {
    data: body,
  });

  console.log("Status:", response.status());
  const responseBody = await response.json();
  console.log("Response Body:", responseBody);

  expect(response.status()).toBe(200);

  expect(responseBody).toMatchObject({
    name: 'John Doe',
    job: 'Developer',
  });

  const valid = ajv.validate(require("./json.schema/putreqres.schema.json"), responseBody);
  console.log(responseBody);
  if (!valid) {
    console.error("AJV Error :", ajv.error());
  }

  expect(valid).toBe(true);
});
