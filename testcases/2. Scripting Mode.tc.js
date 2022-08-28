import katalon from "katalon";
import moment from "moment";

export default katalon.testCase(
  "My First Test Casae",
  async ({ local, web }) => {
    console.log("> Now:", moment());

    console.log("> local:", local);

    const url = "https://katalon-demo" + "-cura.herokuapp.com/";

    console.log("> url:", url);

    await web.openBrowser(url);

    local.url = url;

    await web.click("id=btn-make-appointment");

    console.log(local);

    const loginButton = url.includes("katalon")
      ? "btn-login"
      : "btn-make-appointment";

    await web.click("id=" + loginButton);

    await web.closeBrowser();
  }
);