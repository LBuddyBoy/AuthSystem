export default function Button({ id, text, action }) {
  return (
    <button className="btn" id={id} onClick={action && action}>
      {text}
    </button>
  );
}
