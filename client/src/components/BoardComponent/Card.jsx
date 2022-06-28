import React, { useState } from "react";
import EditCard from "../CardModal/EditCard";
import "../../assets/scss/CardModalStyles/card.scss";
import { Draggable } from "react-smooth-dnd";
import moment from "moment";
import { Avatar } from "@mui/material";
import { Input } from "antd";
import {
  CheckCircleOutlined,
  ContainerOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  LinkOutlined,
  WechatOutlined,
} from "@ant-design/icons";

const Card = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const { card } = props;
  const comment = card.activities.filter((act) => act.isComment).length;
  let checks = { c: 0, n: 0 };
  card.checklists.map((checklist) => {
    return checklist.items.map((item) => {
      if (item.completed) checks.c += 1;
      else checks.n += 1;
      return item;
    });
  });
  let labels = card.labels.filter((i) => i.selected);
  const handleOpenClose = () => {
    setOpenModal((current) => !current);
  };

  const formatDate = (date) => {
    if (moment(date).toDate().getFullYear() < new Date().getFullYear())
      return moment(date).format("MMM DD, yyyy");
    else return moment(date).format("MMM DD");
  };

  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: `80ms`,
    };
  }

  return (
    <>
      <Draggable draggableId={props.info._id} index={props.index}>
        {(provided, snapshot) => {
          return (
            <div
              className="card-container"
              onClick={handleOpenClose}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              style={getStyle(provided.draggableProps.style, snapshot)}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              color={!card.cover.isSizeOne ? card.cover.color : "#fff"}
              padding={card.cover.color && card.cover.isSizeOne}
            >
              {card.cover.isSizeOne && <Input color={card.cover.color} />}
              {labels && (
                <div className="label-container">
                  {labels.map((label) => {
                    return <Input key={label._id} color={label.color} />;
                  })}
                </div>
              )}
              <div className="card-title">{card.title}</div>
              <div className="footer-container">
                <div className="footer-icon-group-container">
                  <div className="footer-icon-group-wrapper">
                    {card.watchers.length > 0 && (
                      <EyeOutlined className="footer-group-icon" />
                    )}
                    {card.attachments.length > 0 && (
                      <div className="footer-attachment-container">
                        <LinkOutlined className="footer-attachment-icon" />
                        <span>{card.attachments.length}</span>
                      </div>
                    )}

                    {(card.date.dueDate || card.date.startDate) && (
                      <div
                        className="footer-date-container"
                        backColor={
                          card.date.completed
                            ? "#61bd4f"
                            : moment(card.date.dueDate).toDate().getTime() <
                              new Date().getTime()
                            ? "#ec9488"
                            : "transparent"
                        }
                        hoverBg={
                          card.date.completed
                            ? "#81dd6f"
                            : moment(card.date.dueDate).toDate().getTime() <
                              new Date().getTime()
                            ? "#eb5a46"
                            : "lightgray"
                        }
                        color={
                          card.date.completed ||
                          moment(card.date.dueDate).toDate().getTime() <
                            new Date().getTime()
                            ? "white"
                            : "darkgray"
                        }
                      >
                        <FieldTimeOutlined
                          style={{
                            color:
                              card.date.completed ||
                              moment(card.date.dueDate).toDate().getTime() <
                                new Date().getTime()
                                ? "white"
                                : "darkgray",
                          }}
                          fontSize="0.5rem"
                        />
                        <span
                          color={
                            card.date.completed ||
                            moment(card.date.dueDate).toDate().getTime() <
                              new Date().getTime()
                              ? "white"
                              : "darkgray"
                          }
                        >{`${
                          card.date.startDate
                            ? formatDate(card.date.startDate)
                            : ""
                        }${
                          card.date.startDate
                            ? card.date.dueDate
                              ? " - "
                              : ""
                            : ""
                        }${
                          card.date.dueDate ? formatDate(card.date.dueDate) : ""
                        }${
                          card.date.dueTime ? " at " + card.date.dueTime : ""
                        }`}</span>
                      </div>
                    )}
                    {card.description && (
                      <ContainerOutlined style={{ fontSize: "0.5rem" }} />
                    )}
                    {comment > 0 && (
                      <div className="comment-container">
                        <WechatOutlined />
                        <span>{comment}</span>
                      </div>
                    )}
                    {card.checklists.length > 0 && (
                      <div className="check-container">
                        <CheckCircleOutlined />
                        <span>
                          {checks.c}/{checks.c + checks.n}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {card.members && (
                  <div className="member-container">
                    {card.members &&
                      card.members.map((member, i) => {
                        return (
                          <Avatar
                            key={i}
                            sx={{
                              width: 28,
                              height: 28,
                              bgcolor: member.color,
                              fontSize: "0.875rem",
                              fontWeight: "800",
                            }}
                          >
                            {member.name[0].toUpperCase()}
                          </Avatar>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </Draggable>
      {openModal && (
        <EditCard
          open={openModal}
          callback={handleOpenClose}
          ids={{
            cardId: props.info._id,
            listId: props.listId,
            boardId: props.boardId,
          }}
        />
      )}
    </>
  );
};

export default Card;
