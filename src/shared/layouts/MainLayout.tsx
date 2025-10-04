import './MainLayout.css'

function MainLayout() {
  
  return (
    <aside className="layout">
      <nav>
        <ul>
          <li><a href="#"> Главная </a></li>
          <li><a href="#"> Новости </a></li>
          <li><a href="#"> Моя страница </a></li>
          <li><a href="#"> Рекомендации </a></li>
          <li><a href="#"> Избранное </a></li>
        </ul>
      </nav>
    </aside>
  )
}

export default MainLayout;