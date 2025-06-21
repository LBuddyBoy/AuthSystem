export default function Button({ id, text }) {
  return (
    <button className="btn" id={id}>
      {text}
    </button>
  );
}
