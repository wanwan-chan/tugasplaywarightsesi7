const { Ajv } = require("ajv");
const { test, expect } = require("playwright/test");

test.describe("Reqresin API Test", () => {
    const ajv = new Ajv();

    test("TC-1 GET Users", async ({ request }) => {
        const response = await request.post("https://reqres.in/api/register");
        const responseJson = await response.json();

        const valid = ajv.validate(require("../json-schema/postreqres.schema.json"), responseJson);

        if (!valid) {
            console.error("AJV Validation Errors:", ajv.errorsText());
        }

        expect(valid).toBe(true);
    });
});
