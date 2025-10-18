import styles from './Header.module.css'
import LogoAston from '../../assets/images/LogoAston.svg'
import UserIcon from '../../assets/images/UserIcon.png'
import Modal from '../../shared/ui/Modal/Modal'
import { useEffect, useState } from 'react'
import { useTheme } from '../../shared/lib/theme/ThemeProvider'
import type { UserT } from '../../entities/user/model/types'

function Header() {
    const { theme } = useTheme()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const [currentUser, setCurrentUser] = useState<UserT | null>(null)

    useEffect(() => {
        const savedId = localStorage.getItem("currentUserId")
        if (savedId) fetchUser(Number(savedId))
    }, [])

    const fetchUser = async (id: number) => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            if (!res.ok) throw new Error("Пользователь не найден")
            const data: UserT = await res.json()
            setCurrentUser(data)
            localStorage.setItem("currentUserId", id.toString())
        } catch (err) {
            console.error(err)
            setCurrentUser(null)
            localStorage.removeItem("currentUserId")
        }
    }

    const handleUserClick = () => {
        const idString = prompt("Введите ID пользователя (1-10):")
        if (!idString) return
        const id = Number(idString)
        if (isNaN(id) || id < 1 || id > 10) {
            alert("Введите корректный ID пользователя от 1 до 10")
            setCurrentUser(null)
            localStorage.removeItem("currentUserId")
            return
        }
        fetchUser(id)
    }
    return (
        <div className={`${styles.header} ${theme === "light" ? styles.light : styles.dark}`}>
            <img src={LogoAston} className={styles.logo} />
            <div className={styles.nav}>
                <ul>
                    <li><a href="#" className={styles.disabled}> Вперед </a></li>
                    <li><a href="#" className={styles.disabled}> На главную </a></li>
                    <li><a href="#" className={styles.disabled}> Назад </a></li>
                </ul>
            </div>
            <div className={styles.project}>

                <button onClick={openModal}>О проекте</button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <Modal.Header>О проекте (заголовок окна)</Modal.Header>
                    <Modal.Body>
                        <p>Мой первое приложение на React, реализующее просмотр постов (контент модального окна)</p>
                    </Modal.Body>
                    <Modal.Footer>
                        (подвал окна)
                    </Modal.Footer>
                </Modal>

                <div className={styles.user} onClick={handleUserClick} style={{ cursor: 'pointer' }}>
                    <img src={UserIcon} className={styles.logo} />
                    <span>{currentUser ? currentUser.name : "Войти"}</span>
                </div>
            </div>
        </div>
    )
}

export default Header;
