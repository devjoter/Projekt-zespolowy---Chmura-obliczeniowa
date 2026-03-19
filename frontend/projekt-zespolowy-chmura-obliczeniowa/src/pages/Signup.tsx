import { Button, Input, Typography, Card } from "antd";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../store/ThemeContext";
import styles from "./Signup.module.css";

const { Title } = Typography;

export default function Signup() {
  const { theme } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");

  const handleSignup = async () => {
    if (password !== repeat) return alert("Passwords do not match");
    try {
      await signup(loginValue, password);
      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div
      className={styles.container}
      style={{ background: theme.backgroundColor }}
    >
      <Card className={styles.card} bordered={false}>
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
        <Input.Password
          placeholder="Repeat password"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
          className={styles.repeatMargin}
        />
        <Button
          type="primary"
          block
          onClick={handleSignup}
          className={styles.buttonMargin}
        >
          Sign up
        </Button>
        <Button block onClick={() => navigate("/login")}>
          Return to login page
        </Button>
      </Card>
    </div>
  );
}
