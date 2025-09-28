import ThemeSwitcher from '../../features/ThemeSwitcher/ui/ThemeSwitcher';
import { useTheme } from '../lib/theme/ThemeProvider';
import styles from './MainLayout.module.css'

function MainLayout() {
    const { theme } = useTheme();
  
  return (
    <aside className={`${styles.layout} ${theme === "light" ? styles.light : styles.dark}`}>
      <nav>
        <ul>
          <li><a href="#"> Главная </a></li>
          <li><a href="#"> Новости </a></li>
          <li><a href="#"> Моя страница </a></li>
          <li><a href="#"> Рекомендации </a></li>
          <li><a href="#"> Избранное </a></li>
        </ul>
      </nav>
      <ThemeSwitcher />
    </aside>
  )
}

export default MainLayout;