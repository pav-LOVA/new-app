import styles from './Header.module.css'
import LogoAston from '../../assets/images/LogoAston.svg'
import UserIcon from '../../assets/images/UserIcon.png'
// import ModalButton from '../../shared/ui/Button/ModalButton'
import Modal from '../../shared/ui/Modal/Modal'
import { useState } from 'react'
import { useTheme } from '../../shared/lib/theme/ThemeProvider'

function Header() {
    const { theme } = useTheme();
    // const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={`${styles.header} ${theme === "light" ? styles.light : styles.dark}`}>
            <img src={LogoAston} className={styles.logo} />
            <div className={styles.nav}>
                <ul>
                    <li><a href="#"> Вперед </a></li>
                    <li><a href="#"> На главную </a></li>
                    <li><a href="#"> Назад </a></li>
                </ul>
            </div>
            <div className={styles.project}>

                <button onClick={openModal}>О проекте</button>
                {/* <ModalButton onClick={() => setIsOpen(true)} />
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <h2>О проекте</h2>
                    <p>
                        Мой первое приложение на React, реализующее просмотр постов
                    </p>
                </Modal> */}

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <Modal.Header>О проекте (заголовок окна)</Modal.Header>
                    <Modal.Body>
                        <p>Мой первое приложение на React, реализующее просмотр постов (контент модального окна)</p>
                    </Modal.Body>
                    <Modal.Footer>
                        (подвал окна)
                    </Modal.Footer>
                </Modal>

                <div className={styles.user}>
                    <img src={UserIcon} className={styles.logo} />
                    <a href="#"> ЕП </a>
                </div>
            </div>
        </div>
    )
}

export default Header;
