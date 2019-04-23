const BrowseViewModel = require("./createtask-view-model");
const GridLayout = require("tns-core-modules/ui/layouts/grid-layout/grid-layout");
const Label = require("tns-core-modules/ui/label/label");
const Dialogs = require("tns-core-modules/ui/dialogs");
const DatePicker = require("tns-core-modules/ui/date-picker").DatePicker;
const TextFieldModule = require("tns-core-modules/ui/text-field");
const app = require("tns-core-modules/application");
const Observable = require("tns-core-modules/data/observable").Observable;
const fileSystemModule = require("tns-core-modules/file-system");
const textViewModule = require("tns-core-modules/ui/text-view");
const ListPicker = require("tns-core-modules/ui/list-picker").ListPicker;
const ButtonModule = require("tns-core-modules/ui/button");
const frameModule = require("tns-core-modules/ui/frame");
const appSettings = require("application-settings");

function onNavigatingTo(args) {
  const component = args.object;
  var layout = component.getViewById("main");
  var grid = new GridLayout.GridLayout();
  grid.rows = "60 120 160 140 *";
  grid.columns = "100 *";

  // NAME     ****************************************************************
  var nameLbl = new Label.Label();
  nameLbl.text = "Name: ";
  nameLbl.row = "0";
  nameLbl.col = "0";
  nameLbl.verticalAlignment = "middle";
  nameLbl.fontSize = "18";
  nameLbl.marginTop = "10";
  grid.addChild(nameLbl);

  var nameTF = new TextFieldModule.TextField();
  nameTF.hint = "Name...";
  nameTF.row = "0";
  nameTF.col = "1";
  nameTF.borderColor = "black";
  nameTF.borderWidth = "1";
  nameTF.marginTop = "10";
  nameTF.marginRight = "5";
  nameTF.fontSize = "14";
  grid.addChild(nameTF);

  // DESCRIPTION     *********************************************************
  var descLbl = new Label.Label();
  descLbl.text = "Description: ";
  descLbl.row = "1";
  descLbl.col = "0";
  descLbl.verticalAlignment = "top";
  descLbl.fontSize = "18";
  descLbl.marginTop = "10";
  grid.addChild(descLbl);

  var descTF = new textViewModule.TextView();
  descTF.hint = "Desc...";
  descTF.row = "1";
  descTF.col = "1";
  descTF.borderColor = "black";
  descTF.borderWidth = "1";
  descTF.marginTop = "10";
  descTF.marginRight = "5";
  descTF.fontSize = "14";
  grid.addChild(descTF);


  // DUE DATE     ************************************************************
  var dueLbl = new Label.Label();
  dueLbl.text = "Due Date: ";
  dueLbl.row = "2";
  dueLbl.col = "0";
  dueLbl.verticalAlignment = "top";
  dueLbl.fontSize = "18";
  dueLbl.marginTop = "10";
  grid.addChild(dueLbl);

  var date = new DatePicker();
  date.fontSize = "12";
  date.verticalAlignment = "middle";
  date.horizontalAlignment = "left";
  date.borderWidth = "1";
  date.row = "2";
  date.col = "1";
  date.marginRight = "5";
  date.marginTop = "10";
  grid.addChild(date);

  // var catLbl = new Label.Label();
  // catLbl.text = "Category: ";
  // catLbl.row = "3";
  // catLbl.col = "0";
  // catLbl.verticalAlignment = "top";
  // catLbl.fontSize = "18";
  // catLbl.marginTop = "10";
  // grid.addChild(catLbl);

  // var temp = ["School", "Food", "Pet", "Alcohol", "Drugs"];

  // var catList = new ListPicker();
  // catList.row = "3";
  // catList.col = "1";
  // catList.borderWidth = "1";
  // catList.borderColor = "black";
  // catList.items = temp.map(category => {
  //   return category.name;
  // });
  // catList.marginRight = "5";
  // catList.marginTop = "10";
  // grid.addChild(catList);

  layout.addChild(grid);


  // CREATE     **************************************************************
  var create = new ButtonModule.Button();
  create.text = "Create";
  create.on("tap", margs => {
    var tempDate =
      date.date.getMonth() +
      1 +
      "/" +
      date.date.getDate() +
      "/" +
      date.date.getFullYear();
    var task = {
      id: global.getID(),
      title: nameTF.text,
      description: descTF.text,
      dueDate: tempDate,
      //Category: args.context.name,
      progress: "0"
    };

    var appCategories = JSON.parse(appSettings.getString("categories"));
    var currCat = appCategories
      .filter(category => {
        return category.id === args.context.id;
      })
      .pop();


    currCat.tasks = [...currCat.tasks, task];

    appCategories.map((c) => {
      if(c.id == currCat.id){
        c.tasks = currCat.tasks;
      }
    });

    console.log(task);

    appSettings.setString(
      "categories",
      JSON.stringify(appCategories)
    );

    //global.AddNewTask(task);
    //component.page.frame.navigate("home/home-items-page");
    component.page.frame.goBack();
  });

  layout.addChild(create);
  component.bindingContext = new BrowseViewModel();
}

exports.cancel = function(args) {
  var btn = args.object;
  var page = btn.page;
  //page.frame.navigate("categories-item-detail/categories-item-detail-page");
  page.frame.goBack();
};

exports.onNavigatingTo = onNavigatingTo;
