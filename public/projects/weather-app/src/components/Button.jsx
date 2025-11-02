export default function Button({ children, disabled, onClick }) {
  return (
    <button className="btn" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
