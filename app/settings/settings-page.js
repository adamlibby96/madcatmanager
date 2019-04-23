const HomeViewModel = require("./settings-view-model");
const frameModule = require("tns-core-modules/ui/frame");
var application = require("tns-core-modules/application");

function onNavigatingTo(args) {
  const page = args.object;

  // const darkBtn = page.getViewById("darkBtn");
  // if (global.darkMode) {
  //   darkBtn.text = "On";
  // } else {
  //   darkBtn.text = "Off";
  // }

  const darkBtn = page.getViewById("darkBtn");
  if(global.darkMode){
      darkBtn.text = "Enabled";
  }
  else{
      darkBtn.text = "Disabled";
  }

  const largeBtn = page.getViewById("largeBtn");
  if(global.largeTxt){
      largeBtn.text = "Enabled";
  }
  else{
      largeBtn.text = "Disabled";
  }

  
  page.bindingContext = new HomeViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

function onBackButtonTap(args) {
    const view = args.view;
    const page = view.page;
  
    page.frame.navigate({
      moduleName: "categories/categories-page",
      animated: true,
      transition: {
        name: "slide",
        duration: 200,
        curve: "ease"
      }
    });
}
exports.onBackButtonTap = onBackButtonTap;

//When dark button is tapped
// function darkModeBtn(args) {
//   if (global.darkMode) {
//     var text = args.object;
//     text.text = "Off";
//     global.darkMode = false;
//     application.setCssFileName("light.css");
//   }
//   else{
//     var text = args.object;
//     text.text = "On";
//     global.darkMode = true;
//     application.setCssFileName("dark.css");
//   }
//   frameModule.topmost().navigate("settings/settings-page");
// }
// exports.darkModeBtn = darkModeBtn;

//When large text button is tapped
function largeTxtBtn(args) {
  if(largeTxt){
      if(darkMode){
          var text = args.object;
          text.text = "Disabled"
          largeTxt = false;
          application.setCssFileName("smallDark.css");
      }
      else{
          var text = args.object;
          text.text = "Disabled"
          largeTxt = false;
          application.setCssFileName("smallLight.css");
      }
  }
  else{
      if(darkMode){
          var text = args.object;
          text.text = "Enabled"
          largeTxt = true;
          application.setCssFileName("app.css");
      }
      else{
          var text = args.object;
          text.text = "Enabled"
          largeTxt = true;
          application.setCssFileName("largeLight.css");
      }
  }
  frameModule.topmost().navigate('settings/settings-page');
}
exports.largeTxtBtn = largeTxtBtn;

//When dark button is tapped
function darkModeBtn(args) {
  if(darkMode){
      if(largeTxt){
          var text = args.object;
          text.text = "Disabled"
          darkMode = false;
          application.setCssFileName("largeLight.css");
      }
      else{
          var text = args.object;
          text.text = "Disabled"
          darkMode = false;
          application.setCssFileName("smallLight.css");
      }
  }
  else{
      if(largeTxt){
          var text = args.object;
          text.text = "Enabled"
          darkMode = true;
          application.setCssFileName("app.css");
      }
      else{
          var text = args.object;
          text.text = "Enabled"
          darkMode = true;
          application.setCssFileName("smallDark.css");
      }
  }
  frameModule.topmost().navigate('settings/settings-page');
}
exports.darkModeBtn = darkModeBtn;
