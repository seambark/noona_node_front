import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, updateTask, deleteTask }) => {
  return (
    <Row>
      <Col xs={12}>
        <div
          className={`todo-item ${
            item?.isComplete === false ? `` : `item-complete`
          }`}
        >
          <div className="todo-content">{item?.task}</div>

          <div>
            <button
              className="button-delete"
              onClick={() => updateTask(item?._id, item?.isComplete)}
            >
              {item?.isComplete === false ? `종료` : `재시작`}
            </button>
            <button
              className="button-delete"
              onClick={() => deleteTask(item?._id)}
            >
              삭제
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
