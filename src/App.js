import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTasks = async () => {
    const response = api.get("/tasks");

    const getData = () => {
      response.then((list) => {
        setTodoList(list.data.data);
      });
    };
    getData();
  };

  const addTask = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });

      if (response.status === 200) {
        console.log("추가 성공");
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("내용 추가에 실패하였습니다.");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const updateTask = async (id, isComplete) => {
    const response = await api.put(`/tasks/${id}`, {
      isComplete: isComplete === false ? true : false,
    });

    try {
      if (response.status === 200) {
        console.log("업데이트 성공");
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("업데이트에 실패하였습니다.");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteTask = async (id) => {
    console.log(id);
    const response = await api.delete(`/tasks/${id}`);

    try {
      if (response.status === 200) {
        console.log("삭제 성공");
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("삭제에 실패하였습니다.");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </Container>
  );
}

export default App;
