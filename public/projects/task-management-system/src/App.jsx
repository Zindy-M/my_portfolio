import { Routes, Route, Link } from "react-router-dom";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="*" element={
        <div className="container">
          <h1>404 - Page Not Found</h1>
          <Link to="/">Go Home</Link>
        </div>
      }/>
    </Routes>
  );
}

export default App;
