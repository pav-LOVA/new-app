import styles from './ThemeSwitcher.module.css'
import Moon from '../../../assets/images/moon.svg'
import Sun from '../../../assets/images/sun.jpg'
import { useTheme } from '../../../shared/lib/theme/ThemeProvider';
import type { MouseEventHandler } from 'react';

function ThemeSwitcher () {

const { theme, toggleTheme } = useTheme();

 const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    toggleTheme();
  };

  return (
    <button className={styles.switcher} onClick={handleClick}>
      {theme === "light" ? <img src={Moon} alt="Switch to dark" /> : <img src={Sun} alt="Switch to light" />}
    </button>
  );

}

export default ThemeSwitcher;