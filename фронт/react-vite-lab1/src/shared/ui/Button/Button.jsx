import "./Buton.css";

export default function Button({ children, onClick }) {
  return (
    <button className="btn-9" onClick={onClick}>
      {children}
    </button>
  );
}
