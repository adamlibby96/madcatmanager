const HomeViewModel = require("./settings-view-model");
const frameModule = require("tns-core-modules/ui/frame");
var application = require("tns-core-modules/application");

function onNavigatingTo(args) {
  const page = args.object;

  const darkBtn = page.getViewById("darkBtn");
  if (global.darkMode) {
    darkBtn.text = "On";
  } else {
    darkBtn.text = "Off";
  }
  page.bindingContext = new HomeViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

//When dark button is tapped
function darkModeBtn(args) {
  if (global.darkMode) {
    var text = args.object;
    text.text = "Off";
    global.darkMode = false;
    application.setCssFileName("light.css");
  }
  else{
    var text = args.object;
    text.text = "On";
    global.darkMode = true;
    application.setCssFileName("dark.css");
  }
  frameModule.topmost().navigate("settings/settings-page");
}
exports.darkModeBtn = darkModeBtn;
