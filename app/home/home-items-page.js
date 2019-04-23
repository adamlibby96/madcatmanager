const HomeItemsViewModel = require("./home-items-view-model");

function onPageLoaded(args) {
  console.log("page loaded");

  args.object.bindingContext = new HomeItemsViewModel();
  args.object.bindingContext.tasks = global.tasks;
}
exports.onPageLoaded = onPageLoaded;

exports.goToCreateTask = function(args) {
  var btn = args.object;
  var page = btn.page;
  page.frame.navigate("createtask/createtask-page");
};

function onNavigatingTo(args) {
  console.log("page navigated to");
  const component = args.object;
  component.bindingContext = new HomeItemsViewModel();
}

function onItemTap(args) {
  const view = args.view;
  const page = view.page;
  const tappedItem = view.bindingContext;

  page.frame.navigate({
    moduleName: "home/home-item-detail/home-item-detail-page",
    context: tappedItem,
    animated: true,
    transition: {
      name: "slide",
      duration: 200,
      curve: "ease"
    }
  });
}

exports.onItemTap = onItemTap;
exports.onNavigatingTo = onNavigatingTo;
