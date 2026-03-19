import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./store/AuthContext";
import { NotesProvider } from "./store/NotesContext";
import "antd/dist/reset.css";
import { ThemeProvider } from "./store/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AuthProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </AuthProvider>
  </ThemeProvider>,
);
