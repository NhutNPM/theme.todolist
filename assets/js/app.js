// TODOLIST
const LIST_TASKS = "LIST_TASKS";
const formAddTask = document.forms.add_task
const ulTasksElement = document.querySelector('.tasks')
const taskResult = document.querySelector('.task-result')
// 
const saveData = data => localStorage.setItem(LIST_TASKS, JSON.stringify(data));
const loadData = () => {
    data = JSON.parse(localStorage.getItem(LIST_TASKS))
    data = data ? data : []
    return data
}
// 
const addTask = (new_task) => {
    let data
    data = loadData()
    data = [...data, new_task]
    saveData(data)
}
// 
const createTaskItem = (task_name, status, index) => {
    return `<li class="task-item" index=${index} is-complete="${status}">
            <span onclick="markTaskComplete(${index})" >${task_name}</span>
            <div class="task-actions">
                <button title="Sửa" onclick="pushEditTask(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                </button>
                <button title="Xóa" onclick="deleteTask(this, ${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                </button>
            </div>
        </li>`
}
// 
const renderTask = () => {
    let count_complete = 0;
    ulTasksHtml = loadData().map((element, index) => {
        if(element.is_complete == true)
            count_complete++
        return createTaskItem(element.task, element.is_complete, index)
    }) 
    ulTasksElement.innerHTML = ulTasksHtml.join('')
    // console.log(count_complete)
    if(count_complete > 1)
        result.innerHTML = `<span class="task-result">Yeah, ${count_complete} tasks completed!</span>`
    else if(count_complete == 1)
        result.innerHTML = `<span class="task-result">Yeah, ${count_complete} task completed!</span>`
    else if(count_complete == 0)
        result.innerHTML = `<span class="task-result">${count_complete} task completed!</span>`
}
// 
const markTaskComplete = (index) => {
    let data = loadData()
    data[index].is_complete = data[index].is_complete ? false : true
    saveData(data)
    renderTask()
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
}
// 
const pushEditTask = (index) => {
    let data = loadData()
    task.value = data[index].task
    task.setAttribute('index', index)
    formAddTask.querySelector('button').textContent = 'EDIT TASK'
}
// 
const saveEditTask = (new_task, index) => {
    let data = loadData()
    data[index].task = new_task
    saveData(data)
    // 
    task.removeAttribute('index')
    formAddTask.querySelector('button').textContent = 'ADD TASK'
}
// 
const countTaskComplete = () => {

}
// 
document.addEventListener('keyup', (e) => {
    // console.log(e.which)
    if(e.keyCode == 27){
        task.value = ''
        task.removeAttribute('index')
        formAddTask.querySelector('button').textContent = 'ADD TASK'
    }
})
// 
formAddTask.onsubmit = e =>{
    if(task.value.length < 2){
        alert('Tên công việc ít nhất 2 ký tự!')
        return false
    }
    // Nếu có tồn tại index
    let index = task.getAttribute('index')
    if(index){
        console.log(task.value)
        saveEditTask(task.value, index)
    }else{
        let new_task
        new_task = {
            task: task.value,
            is_complete: false,
        }
        addTask(new_task)
    }
    task.value = ''
    renderTask()
    // 
    e.preventDefault()
}
// 
renderTask()
// localStorage.clear()



