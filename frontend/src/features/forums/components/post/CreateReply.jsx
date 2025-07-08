import { useState } from "react";
import useMutation from "../../../../hooks/useMutation";
import Error from "../../../../components/Error";
import { useAccount } from "../../../../context/AccountContext";

export default function CreateReply({ post }) {
  const { mutate, loading, data } = useMutation(
    `/posts/${post.id}/replies`,
    "POST",
    ["replies", "posts", "forums"]
  );
  const [error, setError] = useState();
  const {account} = useAccount();

  if (!account) return <></>;

  const addReply = async (formData) => {
    const message = formData.get("message");

    if (!message || message === null || message === "") {
      setError("Please provide a message.");
      return;
    }

    await mutate({
      message,
    });

    setError(null);
  };

  return (
    <div className="createReplyContainer">
      <form className="createReply" action={addReply}>
        <input name="message" placeholder="Add a reply" type="text" />
        <button>Reply</button>
      </form>
      {error && <Error error={error} />}
    </div>
  );
}
