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
          <div className="todo-content">
            <p>{item?.task}</p>
            {item?.author && item?.author.name && (
              <span className="user-name">{item?.author.name}</span>
            )}
          </div>
          <div className="unit-area">
            <button
              className="button-play"
              onClick={() => updateTask(item?._id, item?.isComplete)}
            >
              {item?.isComplete === false ? `종료` : `시작`}
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
