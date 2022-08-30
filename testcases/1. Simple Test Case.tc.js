import katalon from "katalon";
import { myFirstKeyword } from "../keywords/keyword-1";

export default katalon.testCase("Simple Test Case", async ({ local, web }) => {
  await web.openBrowser("https://katalon-demo-cura.herokuapp.com/");

  await web.click("id=btn-make-appointment");

  await web.click("id=btn-login");

  await web.closeBrowser();

  await myFirstKeyword(1, "2", "a");
});
