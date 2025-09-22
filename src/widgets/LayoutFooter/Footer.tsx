import './Footer.css'

function Footer() {
    const year = new Date().getFullYear();

    return (
        <div className="footer">
            <div className="nav">
                Все права защищены. {year}
            </div>
        </div>
    )
}

export default Footer;