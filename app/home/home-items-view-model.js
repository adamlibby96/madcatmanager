const observableModule = require("tns-core-modules/data/observable");

function HomeItemsViewModel() {
    const viewModel = observableModule.fromObject({
        tasks: [],
    });

    return viewModel;
}

module.exports = HomeItemsViewModel;
