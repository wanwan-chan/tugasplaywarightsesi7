const { test, expect } = require("playwright/test");

test('TC-3 DELETE Object', async ({ request }) => {
  const response = await request.delete('https://reqres.in/api/users/2'); 

  console.log("Status:", response.status());

  expect(response.status()).toBe(204);

  const responseBody = await response.text(); 
  console.log("Response Body:", responseBody); 
});
