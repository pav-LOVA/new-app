import { NavLink} from "react-router-dom";
import styles from "./UserTabs.module.css";

const UserTabs = () => {
     const currentUserId = localStorage.getItem("currentUserId");

    return (
        <div className={styles.tabs}>
            <ul>
                <li>
                    <NavLink
                        to={`/posts`}
                        className={({ isActive }) => (isActive ? styles.active : "")}>
                        Все посты
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={`/users/${currentUserId}/albums`}
                        className={({ isActive }) => (isActive ? styles.active : "")}>
                        Мои альбомы
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={`/users/${currentUserId}/todos`}
                        className={({ isActive }) => (isActive ? styles.active : "")}>
                        Мои задачи
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={`/users/${currentUserId}/posts`}
                        className={({ isActive }) => (isActive ? styles.active : "")}>
                        Мои посты
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default UserTabs;