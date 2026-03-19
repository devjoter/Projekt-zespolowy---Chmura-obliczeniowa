import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../store/ThemeContext";
import styles from "./Navbar.module.css";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { logout } = useAuth();

  return (
    <div
      className={styles.navbar}
      style={{ borderBottomColor: theme.borderColor }}
    >
      <Title level={2} className={styles.title}>
        My Notes
      </Title>
      <div className={styles.rightSection}>
        <Title level={5}>{`Logged as: User's login`}</Title>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </div>
  );
}
