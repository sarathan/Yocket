const initState = {
    taskList: [],
}
const taskReducer = (state = initState, action) => {


    switch (action.type) {
        case "SET_EVENTS": {
            return { ...state, taskList: action.data }
        }
        case "OPERATION_FAILED": {
            let alert = {};
            alert.showAlert = true;
            alert.alertType = "danger";
            alert.msg = action.payload.msg;
            return { ...state, alert }
        }
        case "ADD_TASK": {
            const { title, status, priority, _id } = action.payload;
            let taskList = state.taskList;
            taskList.push({ title, status, priority, _id })
            let alert = {};
            alert.showAlert = true;
            alert.alertType = "success";
            alert.msg = "New task added successfully";

            return { ...state, alert }
        }
        case "UPDATE_STATUS": {
            const currentIndex = action.payload;
            let taskList = state.taskList;
            taskList[currentIndex].status = "1";
            let alert = {};
            alert.showAlert = true;
            alert.alertType = "success";
            alert.msg = "Task status updated successfully";

            return { ...state, taskList, alert }
        }
        case "UPDATE_DELETE": {
            const currentIndex = action.payload;
            let taskList = state.taskList;
            taskList.splice(currentIndex, 1);
            let alert = {};
            alert.showAlert = true;
            alert.alertType = "success";
            alert.msg = "Task deleted successfully";

            return { ...state, taskList, alert }
        }
        case "UPDATE_TASK": {
            const { title, priority, currentIndex } = action.payload;
            let taskList = state.taskList;
            taskList[currentIndex].title = title;
            taskList[currentIndex].priority = priority;
            let alert = {};
            alert.showAlert = true;
            alert.alertType = "success";
            alert.msg = "Task updated successfully";

            return { ...state, taskList, alert }
        }
        default:
            return state;
    }

}
export default taskReducer;