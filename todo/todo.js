const fs = require("fs");
const filePath = "tasks.json";

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath); //object but not a string
    const dataJSON = dataBuffer.toString(); // data json diff from regular json
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({task});
  saveTasks(tasks);
  console.log("Task added successfully !", task);
};

const listTasks = () => {
    const tasks = loadTasks();
    tasks.map((task,index) => console.log(`${index + 1} : ${task.task}`))
}

const removeTask = (index) => {
    const tasks = loadTasks();
    if(tasks.length === 0){
        console.log("Already empty !")
        return 
    }
    
    tasks.splice(index - 1, 1)
    saveTasks(tasks)
    console.log("Removed successfully !",loadTasks());
}

const command = process.argv[2]; //input from terminal
const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("Command not found !");
}
