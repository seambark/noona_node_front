import { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "../utils/api";

const TodoList = ({ user }) => {
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

  const userLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <div className="logoutBox">
            <p className="userText">
              <b>{user?.name}</b>님 환영합니다!
            </p>
            <button type="button" className="logout" onClick={userLogout}>
              로그아웃
            </button>
          </div>
        </Col>
      </Row>
      <Row className="add-item-row">
        <Col>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
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
};

export default TodoList;
