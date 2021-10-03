
import api from '../utils/api';

export const setEvents = (data) => {
    return {
        type: "SET_EVENTS",
        data
    }
}

export const setAddTask = payload => async dispatch => {
    try {
        const res = await api.post('/tasks/newTask', payload);

        dispatch({
            type: "ADD_TASK",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "OPERATION_FAILED",
            payload: { msg: "Unable to Add Task" }
        });
    }
};


export const handleTaskStatus = payload => async dispatch => {
    try {
        await api.put(`/tasks/updateTask/${payload.id}`);

        dispatch({
            type: "UPDATE_STATUS",
            payload: payload.currentIndex
        });
    } catch (err) {
        dispatch({
            type: "OPERATION_FAILED",
            payload: { msg: "Unable to update Task" }
        });
    }
};

export const handleTaskDelete = payload => async dispatch => {
    try {
        await api.delete(`/tasks/deleteTask/${payload.id}`);

        dispatch({
            type: "UPDATE_DELETE",
            payload: payload.currentIndex
        });
    } catch (err) {
        dispatch({
            type: "OPERATION_FAILED",
            payload: { msg: "Unable to delete Task" }
        });
    }
};

export const handleTaskUpdate = payload => async dispatch => {
    try {
        await api.post('/tasks/updateTask', payload);

        dispatch({
            type: "UPDATE_TASK",
            payload
        });
    } catch (err) {
        dispatch({
            type: "OPERATION_FAILED",
            payload: { msg: "Unable to update Task" }
        });
    }
};