export default function Card({ children, icon, label, value }) {
  return (
    <div className="card">
      {icon && <div className="icon">{icon}</div>}
      {label && <p className="label">{label}</p>}
      {value && <p className="value">{value}</p>}
      {children}
    </div>
  );
}
