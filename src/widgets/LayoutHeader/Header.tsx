import './Header.css'
import LogoAston from '../../assets/images/LogoAston.svg'
import UserIcon from '../../assets/images/UserIcon.png'

function Header() {

    return (
        <div className="header">
            <img src={LogoAston} className='logo' />
            <div className="nav">
                <ul>
                    <li><a href="#"> Вперед </a></li>
                    <li><a href="#"> На главную </a></li>
                    <li><a href="#"> Назад </a></li>
                </ul>
            </div>
            <div className="user">
                <img src={UserIcon} className='logo' />
                <a href="#"> ЕП </a>
            </div>
        </div>
    )
}

export default Header;