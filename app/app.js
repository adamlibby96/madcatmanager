const application = require("tns-core-modules/application");

global.darkMode = false;
global.reload = false;

global.getID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

global.tasks = [
  {
    Title: "Test task 1",
    Description: "Test description 1",
    DueDate: "4/7/2019",
    Category: "Test Category 1",
    Progress: "50"
  },
  {
    Title: "Test task 2",
    Description: "Test description 2",
    DueDate: "4/8/2019",
    Category: "Test Category 2",
    Progress: "70"
  },
  {
    Title: "Test task 3",
    Description: "Test description 3",
    DueDate: "4/9/2019",
    Category: "Test Category 3",
    Progress: "50"
  },
  {
    Title: "Test task 4", 
    Description: "Test description 4",
    DueDate: "4/10/2019",
    Category: "Test Category 4",
    Progress: "70"
  }
];

global.AddNewTask = task => {
  global.tasks = [...global.tasks, task];
};

application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
