import useMutation from "../../../../hooks/useMutation";

export default function CreateReply({ post }) {
  const { mutate, loading, data, error } = useMutation(
    `/posts/${post.id}/replies`,
    "POST",
    ["replies"]
  );
  const addReply = async (formData) => {
    const message = formData.get("message");

    await mutate({
        message
    });
  };

  return (
    <form className="createReply" action={addReply}>
      <input name="message" placeholder="Add a reply" type="text" />
      <button>Reply</button>
    </form>
  );
}
