import ThemeSwitcher from '../../features/ThemeSwitcher/ui/ThemeSwitcher';
import { useTheme } from '../lib/theme/ThemeProvider';
import styles from './MainLayout.module.css'
import UserTabs from '../../widgets/UserTabs/UserTabs';
import type { PropsWithChildren } from 'react';

const MainLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <aside className={`${styles.layout} ${theme === "light" ? styles.light : styles.dark}`}>
      <nav>
        <UserTabs />
      </nav>
      <ThemeSwitcher />
      {children}
    </aside>
  )
}

export default MainLayout;