const appSettings = require("application-settings");

function onNavigatingTo(args) {
  const page = args.object;

  page.bindingContext = args.context;
  //   console.log(page.bindingContext);
}

function onBackButtonTap(args) {
  const view = args.object;
  const page = view.page;

  page.frame.goBack();
}

function markCompleted(args) {
  const page = args.object.page;
  var appCategories = JSON.parse(appSettings.getString("categories"));

  var filteredCategories = appCategories.map(category => {
    var newCat = {
      id: category.id,
      name: category.name,
      tasks: []
    };
    category.tasks.forEach(task => {
      if (page.bindingContext.id !== task.id) {
        newCat.tasks.push(task);
      }
    });
    return newCat;
  });
  appSettings.setString("categories", JSON.stringify(filteredCategories));

  page.frame.goBack();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;
exports.markCompleted = markCompleted;
