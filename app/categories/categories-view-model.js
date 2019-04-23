const observableModule = require("tns-core-modules/data/observable");

function CategoriesViewModel() {
  const viewModel = observableModule.fromObject({
    categories: []
  });

  return viewModel;
}

module.exports = CategoriesViewModel;
