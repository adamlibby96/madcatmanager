const appSettings = require("application-settings");
const frameModule = require("tns-core-modules/ui/frame");

var cat;

function onNavigatingTo(args) {
  const page = args.object;
  var appCategories = JSON.parse(appSettings.getString("categories"));
  var pageData = appCategories
    .filter(category => {
      return category.id === args.context.id;
    })
    .pop();

  cat = args.context;
  page.bindingContext = pageData;
}

exports.goToCreateTask = function(args) {
  var btn = args.object;
  var page = btn.page;

  var param={
    moduleName: "createtask/createtask-page",
    context: cat
  }
  frameModule.topmost().navigate(param);

  // frameModule.topmost().navigate({
  //   moduleName: "createtask/createtask-page",
  //   context: {
  //     cat: catName,
  //   },
  //   animated: true,
  //   transition: {
  //     name: "slide",
  //     duration: 200,
  //     curve: "ease"
  //   }
  // });
};

function onBackButtonTap(args) {
  const view = args.object;
  const page = view.page;

  page.frame.goBack();
}

function onItemTap(args) {
  const view = args.view;
  const page = view.page;
  const tappedItem = view.bindingContext;

  page.frame.navigate({
    moduleName: "task/task-detail-page",
    context: tappedItem,
    animated: true,
    transition: {
      name: "slide",
      duration: 200,
      curve: "ease"
    }
  });
}

function deleteCat(args){
  const page = args.object.page;
  var appCategories = JSON.parse(appSettings.getString("categories"));

  appCategories.splice(appCategories.indexOf(cat), 1);
  appSettings.setString("categories", JSON.stringify(appCategories));

  page.frame.goBack();
}

exports.deleteCat = deleteCat;
exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;
exports.onItemTap = onItemTap;
