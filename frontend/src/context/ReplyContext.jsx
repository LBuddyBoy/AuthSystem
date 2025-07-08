import { createContext, useContext, useState } from "react";
import useMutation from "../hooks/useMutation";

const ReplyContext = createContext();

export function ReplyProvider({ children }) {
  const {
    mutate: deleteReply,
    loading: deleteLoading,
    data: deleteData,
    error: deleteError,
  } = useMutation(`/replies/`, "DELETE", ["replies"]);
  const {
    mutate: updateReply,
    loading: updating,
    data: updateData,
    error: updateError,
  } = useMutation(`/replies/`, "PUT", ["replies"]);
  const [editing, setEditing] = useState(false);
  const [replyEditing, setReplyEditing] = useState(null);
  const [message, setMessage] = useState(null);

  const saveEdits = async () => {
    const payload = {
      message,
    };

    await updateReply(payload, replyEditing.id);
    stopEditing();
  };

  const startEditing = (reply) => {
    setEditing(true);
    setReplyEditing(reply);
  };

  const stopEditing = () => {
    setEditing(false);
    setReplyEditing(null);
  };

  const isEditing = (reply) => {
    return editing && replyEditing !== null && replyEditing.id === reply.id;
  };

  const handleDelete = async (reply) => {
    await deleteReply({}, reply.id)
    stopEditing();
  }

  const exports = {
    saveEdits,
    startEditing,
    stopEditing,
    setMessage,
    isEditing,
    handleDelete,
    editing,
    replyEditing,
  };

  return (
    <ReplyContext.Provider value={exports}>{children}</ReplyContext.Provider>
  );
}

export function useReply() {
  const context = useContext(ReplyContext);

  if (!context)
    throw new Error("useReply must be used inside of the ReplyContext");

  return context;
}
