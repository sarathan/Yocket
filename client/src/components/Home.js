import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import api from '../utils/api';
import { setEvents, setAddTask, handleTaskStatus, handleTaskDelete, handleTaskUpdate } from '../actions/productActions'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'

const options = ["Low", "Med", "High"];

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            selectedOption: options[0],
            currentIndex: 0,
            currentTitle: '',
            newTitle: '',
            showAdd: false,
            showEdit: false
        }
        this.timeout = 0;

    }

    componentDidMount() {
        this.setState({ isLoading: true });
        api.get(`/tasks/${this.props.userId}`)
            .then(response => response.data)
            .then(response => {

                this.setState({ isLoading: false });
                this.props.setEvents(response);
            }).catch(err => {
                this.setState({ isLoading: false });
            });


    }

    handleSelect(eventKey) {
        this.setState({ selectedOption: options[eventKey] });
    }

    handleStatus(currentIndex) {
        let payload = {};
        payload.currentIndex = currentIndex;
        payload.id = this.props.taskList[currentIndex]._id;
        this.props.handleTaskStatus(payload);
    }

    handleDelete(currentIndex) {
        let payload = {};
        payload.currentIndex = currentIndex;
        payload.id = this.props.taskList[currentIndex]._id;
        this.props.handleTaskDelete(payload);
    }

    saveTask = () => {
        if (this.state.newTitle === '' || this.state.newTitle === undefined || this.state.newTitle.length <= 0) {
            return;
        }
        else {
            this.setState({ showAdd: false });
            const { newTitle, selectedOption } = this.state;
            this.props.setAddTask({ title: newTitle, priority: options.indexOf(selectedOption), status: 0, user: this.props.userId });
        }

    }

    handleUpdate(currentIndex) {
        const task = this.props.taskList[currentIndex];
        this.setState({ currentTitle: task.title, showEdit: true, currentIndex, selectedOption: options[task.priority] });
    }



    updateTask = () => {
        this.setState({ showEdit: false });
        const { currentTitle, selectedOption, currentIndex } = this.state;
        let payload = {};
        payload.title = currentTitle;
        payload.id = this.props.taskList[currentIndex]._id;
        payload.priority = options.indexOf(selectedOption);
        payload.currentIndex = currentIndex;
        this.props.handleTaskUpdate(payload);
    }

    updateField = (fieldName, fieldValue) => this.setState({ [fieldName]: fieldValue });


    render() {
        const {
            isLoading,
            selectedOption,
            showAdd,
            showEdit,
            newTitle,
            currentTitle
        } = this.state;

        const {
            taskList,
            alert,
            isAuthenticated
        } = this.props;

        if (isAuthenticated === undefined || !isAuthenticated) {
            return <Redirect to='/' />;
        }

        return (
            <div>
                {isLoading && (<div style={{ textAlign: "center" }}>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </div>)}
                {!isLoading && (
                    <div>
                        <br />
                        <div className="container">

                            {alert && alert.showAlert && (<Alert variant={alert.alertType}>
                                {alert.msg}
                            </Alert>)}
                            <div style={{ display: "flex", marginBottom: "10px" }}>
                                <span style={{ width: "60%" }}>
                                    <span style={{ fontSize: "20px" }}>Welcome <b>{this.props.name}</b></span>
                                </span>
                                <span style={{ width: "40%" }}>
                                    <Button variant="primary" onClick={() => this.updateField("showAdd", true)}>Add Task</Button>
                                </span>
                            </div>
                            <div className="row row-flex">
                                {taskList.length > 0 ? (taskList.map((task, id) => (
                                    <div key={id} className="col-md-4 col-sm-6 col-xs-12">
                                        <Card className="text-center">
                                            <Card.Header style={{ fontWeight: "bold" }}>{task.title}</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Priority</Card.Title>
                                                <Card.Text>
                                                    {options[task.priority]}
                                                </Card.Text>
                                                {task.status === "0" && (<Button variant="warning" onClick={() => this.handleStatus(id)}>Move to Complete</Button>)}
                                                {task.status === "1" && (<Button variant="success">Completed</Button>)}

                                            </Card.Body>
                                            <Card.Footer className="text-muted">

                                                <Button variant="primary" style={{ float: "left" }} onClick={() => this.handleUpdate(id)} disabled={task.status === "1"}>Edit</Button>
                                                <Button variant="danger" style={{ float: "right" }} onClick={() => this.handleDelete(id)}>Delete</Button>

                                            </Card.Footer>
                                        </Card>

                                    </div>

                                ))) : <div style={{
                                    alignItems: "center",
                                    margin: "0 auto",
                                    fontSize: "60px",
                                    color: "blue"
                                }}>Create new Task ...</div>}
                            </div>



                            {showAdd && (<Modal show={showAdd} onHide={() => this.updateField("showAdd", false)}>
                                <Modal.Header>
                                    <Modal.Title>Add New Task</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicTitle">
                                            <Form.Label>Task Name</Form.Label>
                                            <Form.Control type="text" value={newTitle} onChange={(e) => this.updateField("newTitle", e.target.value)} placeholder="Enter task name" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicTitle">
                                            <Form.Label>Task Priority</Form.Label>
                                            <DropdownButton id="dropdown-button" title={selectedOption}>
                                                {options.map((option, id) => (
                                                    <Dropdown.Item key={"dropdown" + id} onClick={() => this.handleSelect(id)}>{option}</Dropdown.Item>
                                                ))}
                                            </DropdownButton>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.updateField("showAdd", false)}>Close</Button>
                                    <Button variant="primary" onClick={this.saveTask}>Save changes</Button>
                                </Modal.Footer>
                            </Modal>)}

                            {showEdit && (<Modal show={showEdit} onHide={() => this.updateField("showEdit", false)}>
                                <Modal.Header>
                                    <Modal.Title>Edit Task</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicTitle">
                                            <Form.Label>Task Name</Form.Label>
                                            <Form.Control type="text" value={currentTitle} onChange={(e) => this.updateField("currentTitle", e.target.value)} placeholder="Enter task name" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicTitle">
                                            <Form.Label>Task Priority</Form.Label>
                                            <DropdownButton id="dropdown-button" title={selectedOption}>
                                                {options.map((option, id) => (
                                                    <Dropdown.Item key={"dropdown" + id} onClick={() => this.handleSelect(id)}>{option}</Dropdown.Item>
                                                ))}
                                            </DropdownButton>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.updateField("showEdit", false)}>Close</Button>
                                    <Button variant="primary" onClick={this.updateTask}>Update changes</Button>
                                </Modal.Footer>
                            </Modal>)}

                        </div>
                    </div>


                )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        taskList: state.tasks.taskList,
        alert: state.tasks.alert,
        userId: state.auth.userId,
        name: state.auth.name,
        isAuthenticated: state.auth.isAuthenticated

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEvents: (data) => dispatch(setEvents(data)),
        setAddTask: (data) => dispatch(setAddTask(data)),
        handleTaskStatus: (data) => dispatch(handleTaskStatus(data)),
        handleTaskDelete: (data) => dispatch(handleTaskDelete(data)),
        handleTaskUpdate: (data) => dispatch(handleTaskUpdate(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)