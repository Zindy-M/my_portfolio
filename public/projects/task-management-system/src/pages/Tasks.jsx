import { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/Card";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");

    if (editingId) {
      setTasks(tasks.map(t => t.id === editingId ? { ...t, title, description } : t));
      setEditingId(null);
    } else {
      setTasks([...tasks, { id: crypto.randomUUID(), title, description, completed: false, createdAt: new Date().toISOString() }]);
    }

    setTitle("");
    setDescription("");
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingId(task.id);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="container">
      <h1>Task Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Task" : "Add Task"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title *</label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
            </div>
            <div>
              <label>Description</label>
              <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Task description" />
            </div>
            <Button type="submit" className="primary">{editingId ? "Update" : "Add"}</Button>
            {editingId && <Button type="button" className="secondary" onClick={() => { setEditingId(null); setTitle(""); setDescription(""); }}>Cancel</Button>}
          </form>
          <div>
            <p>Total: {tasks.length}</p>
            <p>Completed: {completedCount}</p>
            <p>Pending: {tasks.length - completedCount}</p>
          </div>
        </CardContent>
      </Card>

      <div>
        {tasks.length === 0 ? (
          <Card>No tasks yet.</Card>
        ) : tasks.map(task => (
          <Card key={task.id} className={task.completed ? "task-completed" : ""}>
            <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div>{task.title}</div>
                {task.description && <div>{task.description}</div>}
                <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
              </div>
              <div>
                <Button className="secondary" onClick={() => handleEdit(task)} disabled={task.completed}>Edit</Button>
                <Button className="secondary" onClick={() => handleDelete(task.id)}>Delete</Button>
                <Button className="secondary" onClick={() => handleToggle(task.id)}>{task.completed ? "Undo" : "Done"}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
