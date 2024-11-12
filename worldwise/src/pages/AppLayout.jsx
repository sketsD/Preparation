// import AppNav from "../components/AppNav";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";
import styles from "./AppLayout.module.css";
import { useAuth } from "../contexts/FakeAuthContext";

function AppLayout() {
  const { isAuthenticated } = useAuth();
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {isAuthenticated && <User />}
    </div>
  );
}

export default AppLayout;
