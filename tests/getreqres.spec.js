const { test, expect } = require("playwright/test");
const { Ajv } = require("Ajv");

const ajv = new Ajv();

test('GET Request', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2')
    console.log(await response.json());

    const resBody = await response.json()

    expect(response.status()).toEqual(200)
    expect(response.ok()).toBeTruthy()

    const valid = ajv.validate(require("./json.schema/getreqres.schema.json"), resBody);
    // console.log(resBody);
    if (!valid) {
        console.error("AJV Error :", ajv.error());
    }

    expect(valid).toBe(true);
});





















// const { test } = require("playwright/test");

// test('GET Request', async ({ request }) => {
//     const response = await request.get('https://reqres.in/api/users/2')
//     console.log(await response.json());
// });  