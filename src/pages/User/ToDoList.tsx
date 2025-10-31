import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  List,
  message,
  Row,
  Select,
  Typography,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";

const { Title } = Typography;
const { Option } = Select;

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: string;
  deadline: string;
}

const TodoList: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [priority, setPriority] = useState<string>("medium");
  const [deadline, setDeadline] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.email) {
      setUserEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    const fetchTodos = async () => {
      if (userEmail) {
        try {
          const response = await axios.get(
            `https://bracu-study-portal.onrender.com/api/v1/todos?userEmail=${userEmail}`
          );
          setTodos(response.data);
        } catch (error) {
          message.error("Failed to fetch todos");
        }
      }
    };
    fetchTodos();
  }, [userEmail]);

  const addTask = async () => {
    if (task.trim() && userEmail) {
      const newTodo = {
        id: `${Math.random().toString(36).substr(2, 9)}`,
        text: task,
        completed: false,
        priority,
        deadline,
      };

      try {
        await axios.post("https://bracu-study-portal.onrender.com/api/v1/todos", {
          ...newTodo,
          userEmail,
        });
        setTodos([...todos, newTodo]);
        setTask("");
        setPriority("medium");
        setDeadline("");
        message.success("Task added!");
      } catch (error) {
        message.error("Failed to add task");
      }
    } else {
      message.error("Please enter a task and ensure you are logged in.");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`https://bracu-study-portal.onrender.com/api/v1/todos/${id}`);
      // Refreshing the page by fetching todos again after deletion
      const response = await axios.get(
        `https://bracu-study-portal.onrender.com/api/v1/todos?userEmail=${userEmail}`
      );
      setTodos(response.data);
      message.success("Task deleted!");
    } catch (error) {
      message.error("Failed to delete task");
    }
  };

  const handleEdit = async (id: string) => {
    const todoToEdit = todos.find((todo) => todo._id === id);
    if (todoToEdit) {
      const newText = prompt("Edit task", todoToEdit.text) || todoToEdit.text;
      const newPriority =
        prompt("Edit priority", todoToEdit.priority) || todoToEdit.priority;
      const newDeadline =
        prompt("Edit deadline (YYYY-MM-DD)", todoToEdit.deadline) ||
        todoToEdit.deadline;

      if (newText) {
        try {
          const updatedTodo = {
            ...todoToEdit,
            text: newText,
            priority: newPriority,
            deadline: newDeadline,
          };
          await axios.put(
            `https://bracu-study-portal.onrender.com/api/v1/todos/${id}`,
            updatedTodo
          );
          setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? updatedTodo : todo))
          );
          message.success("Task updated!");
        } catch (error) {
          message.error("Failed to update task");
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <Title level={3}>To-Do List</Title>
      <Row gutter={16}>
        <Col span={16}>
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
          />
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={addTask} block>
            Add Task
          </Button>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "10px" }}>
        <Col span={12}>
          <Select
            value={priority}
            onChange={setPriority}
            style={{ width: "100%" }}
          >
            <Option value="high">High</Option>
            <Option value="medium">Medium</Option>
            <Option value="low">Low</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Deadline (YYYY-MM-DD)"
          />
        </Col>
      </Row>

      <List
        style={{ marginTop: "20px" }}
        bordered
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            style={{
              background: todo.completed ? "#f6ffed" : "white",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <span>{todo.text}</span>
            <div>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit(todo._id)}
              />
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteTask(todo._id)}
              />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;
