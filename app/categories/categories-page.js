const CategoriesViewModel = require("./categories-view-model");
const appSettings = require("application-settings");
const dialogs = require("tns-core-modules/ui/dialogs");
var application = require("tns-core-modules/application");
const frameModule = require("tns-core-modules/ui/frame");


function onLoaded(){
  console.log("loaded");
  if(!global.reload){
    console.log("reload");
    if(global.darkMode){
      application.setCssFileName("dark.css");
    }
    else{
      application.setCssFileName("light.css");
    }
    global.reload = true;
    frameModule.topmost().navigate("categories/categories-page");
    this.reload;
  }
  else{
    global.reload = false;
  }
}
exports.onLoaded = onLoaded;

function onNavigatingTo(args) {
  console.log("navigated to");
  const page = args.object;
  page.bindingContext = new CategoriesViewModel();
  appSettings.hasKey("categories")
    ? (page.bindingContext.categories = JSON.parse(
        appSettings.getString("categories")
      ))
    : (page.bindingContext.categories = [
        {
          id: global.getID(),
          name: "School",
          tasks: [
            {
              id: global.getID(),
              title: "Bible paper",
              description: "Bible final",
              dueDate: "4/23/2019",
              progress: "35"
            },
            {
              id: global.getID(),
              title: "Task manager app",
              description: "MAD final app",
              dueDate: "4/23/2019",
              progress: "50"
            }
          ]
        }
      ]);
}

function onNavigatingFrom(args) {
  const page = args.object;
  appSettings.setString(
    "categories",
    JSON.stringify(page.bindingContext.categories)
  );
}

function onItemTap(args) {
  const view = args.view;
  const page = view.page;
  const tappedItem = view.bindingContext;

  page.frame.navigate({
    moduleName: "categories/categories-item-detail/categories-item-detail-page",
    context: tappedItem,
    animated: true,
    transition: {
      name: "slide",
      duration: 200,
      curve: "ease"
    }
  });
}

function addCategory(args) {
  const page = args.object.page;

  dialogs
    .prompt({
      title: "Category Name: ",
      inputType: dialogs.inputType.text,
      okButtonText: "Confirm",
      cancelButtonText: "Cancel"
    })
    .then(r => {
      if (!r.result) return;
      page.bindingContext.categories.push({
        id: global.getID(),
        name: r.text,
        tasks: []
      });
      page.getViewById("categoryList").refresh();
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onNavigatingFrom = onNavigatingFrom;
exports.onItemTap = onItemTap;
exports.addCategory = addCategory;
