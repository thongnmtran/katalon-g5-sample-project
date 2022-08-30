import katalon from "katalon";

export default katalon.testCase("New Test Case", async ({ local, web }) => {
  await web.openBrowser("https://katalon-demo-cura.herokuapp.com/");
  await web.click("css=#btn-make-appointment");
  await web.click("css=#login");
  await web.click("css=#login .row");
  await web.click('css=[data-gr-ext-installed=""]');
  await web.click("css=#login .row");
  await web.click("css=#login .row");
  await web.closeBrowser();
});
