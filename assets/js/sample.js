let data = [
  {
    task: "Rum 2km",
    is_complete: false,
  },
  {
    task: "Coding",
    is_complete: true,
  },
  {
    task: "Learn JS",
    is_complete: false,
  },
];

// console.log(data)                   // (3) [{…}, {…}, {…}]
// console.log(data[0])                // {task: 'Rum 2km', is_complete: false}
// console.log(data[0].task)           // Rum 2km
// console.log(data[1])                // {task: 'Coding', is_complete: true}
// console.log(data[1].task)           // Coding
// console.log(data[2])                // {task: 'Learn JS', is_complete: false}
// console.log(data[2].task)           // Learn JS

const LIST_TASKS = "LIST_TASKS";
function saveData(data) {
  localStorage.setItem(LIST_TASKS, JSON.stringify(data));
}
const loadData = () => {
  let data;
  data = JSON.parse(localStorage.getItem(LIST_TASKS));
  data = data ? data : []
  return data;
};
saveData(data);
const addTask = (new_task) =>{
    let data
    data = loadData()
    data.push(new_task)
    console.log(data)
}
// 
const deleteTask = (element, index) => {
  let delete_confirm
  delete_confirm = confirm('Bạn có thực sự muốn xóa công việc này không?')
  if(delete_confirm == false) return false
  // 
  let data = loadData()
  data.splice(index, 1)
  saveData(data)
  element.closest('.task-item').remove()
  // renderTask()
}

// console.log(loadData())
// localStorage.clear()

formAddTask.onsubmit = e =>{
    const inputTask = formAddTask.task
    console.log(inputTask.value)
    console.log(task)
    console.log(todolist)
    // saveData(data)
    e.preventDefault()
}
