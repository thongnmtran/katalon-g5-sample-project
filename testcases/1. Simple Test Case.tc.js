import katalon from "katalon";
import {  } from '../keywords/keyword-1.js';

export default katalon.testCase("Simple Test Case", async ({ local, web }) => {
  await web.openBrowser("https://katalon-demo-cura.herokuapp.com/");

  await web.click("id=btn-make-appointment");

  await web.click("id=btn-login");

  await web.closeBrowser();

  await myFirstKeyword
});
