const { test, expect } = require("@playwright/test");
const { Ajv } = require("Ajv");


const ajv = new Ajv();

test('POST request', async ({request}) => {

    const reqHeaders = {
        Accept: 'application/json'
    }

    const body = {
            "name": "alif",
            "job": "QA Automation"
    }

    const response = await request.post("https://reqres.in/api/users", {
        headers: reqHeaders,
        data: body,
    })
    expect(response.status()).toEqual(201)
    expect(response.ok()).toBeTruthy()

    const resBody = await response.json()
    expect(resBody.name).toEqual('morpheus')

    const valid  = ajv.validate(require("./json.schema/postreqres.schema.json"), resBody);
    console.log(resBody);
    if(!valid) {
        console.error("AJV Error :", ajv.error());
    }

    expect(valid).toBe(true);
});