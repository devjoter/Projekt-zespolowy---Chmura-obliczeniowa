import { Button, Input, Typography, Card } from "antd";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../store/ThemeContext";
import styles from "./Login.module.css";

const { Title } = Typography;

export default function Login() {
  const { theme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(loginValue, password);
      navigate("/notes");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div
      className={styles.container}
      style={{ background: theme.backgroundColor }}
    >
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          My Notes
        </Title>
        <Input
          placeholder="Login"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          className={styles.inputMargin}
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.passwordMargin}
        />
        <Button
          type="primary"
          block
          onClick={handleLogin}
          className={styles.buttonMargin}
        >
          Log in
        </Button>
        <Button block onClick={() => navigate("/signup")}>
          Sign up
        </Button>
      </Card>
    </div>
  );
}
