import { useEffect, useState } from "react";
import axios from "axios";
function App() {
 const [task, setTask] = useState([]);
 const [selectedData, setSelectedData] = useState();
 const [edit, setEdit] = useState(false);
 const [taskId, setTaskId] = useState();
 const getTasks = () => {
 axios
 .get("http://localhost:3000/api/tasks")
 .then((res) => setTask(res.data));
 };
 const deleteTask = (id) => {
 axios
 .delete(`http://localhost:3000/api/tasks/${id}`)
 .then(() => getTasks());
 };
 const getTaskById = (id) => {
 axios
 .get(`http://localhost:3000/api/tasks/${id}`)
 .then((res) => setSelectedData(res.data.task));
 };
 const updateTask = () => {
 axios
 .put(`http://localhost:3000/api/tasks/${taskId}`, {
 task: selectedData,
 })
 .then(() => getTasks());
 };
 const addTask = () => {
 axios
 .post("http://localhost:3000/api/tasks", {
 task: selectedData,
 })
 .then(() => getTasks());
 };
 useEffect(() => getTasks(), []);
 return (
 <section className="container">
 <div>
 <h1>TO DO LIST</h1>
 </div>
 <div className="input-container">
 <input
 placeholder="enter the task"
 value={selectedData}
 onChange={(e) => setSelectedData(e.target.value)}
 className="input-box"
 />
 {edit ? (
 <button
 className="input-btn"
 onClick={() => {
 updateTask();
 setSelectedData("");
 setEdit(false);
 }}
 >
 edit
 </button>
 ) : (
 <button
 className="input-btn"
 onClick={() => {
 addTask();
 setSelectedData("");
 }}
 >
 add
 </button>
 )}
 </div>
 <div className="task-parent">
 {task.map((task) => (
 <article key={task.id} className="task-container">
 <h4 className="task-content">{task.task}</h4>
 <div className="btn-container">
 <button
 className="edit-btn"
 onClick={() => {
 setTaskId(task.id);
 setEdit(true);
 getTaskById(task.id);
 }}
 >
 edit
 </button>
 <button className="dlt-btn" onClick={() =>{ deleteTask(task.id)
 }}>
 delete
 </button>
 </div>
 </article>
 ))}
 </div>
 </section>
 );
}
export default App;