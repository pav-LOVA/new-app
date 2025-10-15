import { useTheme } from '../../shared/lib/theme/ThemeProvider';
import styles from  './Footer.module.css'


function Footer() {
    const { theme } = useTheme();
    const year = new Date().getFullYear();

    return (
        <div className={`${styles.footer} ${theme === "light" ? styles.light : styles.dark}`}>
            <div className={styles.nav}>
                Все права защищены. {year}
            </div>
            <div className={styles.theme}>
            </div>
        </div>
    )
}

export default Footer;