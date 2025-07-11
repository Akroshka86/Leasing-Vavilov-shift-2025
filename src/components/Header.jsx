import '../styles/Header.css';
import logo_car from '../assets/logo_car.svg';
import logo_user from '../assets/logo_user.svg';
import logo_time from '../assets/logo_time.svg';
import logo_exit from '../assets/logo_exit.svg';
import logo_style from '../assets/logo_style.svg';


export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        
        {/* Логотип */}
        <div className="logoLeasing">
            <div className="text-container">
                <span className="rent">Rent</span>
                <span className="shift">ШИФТ</span>
            </div>
            <div className="vector">
                <img src={logo_car} alt="назад" />
            </div>
        </div>

        {/* Меню и действия */}
        <div className="menu">
          
          <nav className="desktopNavigation">
            <div className="item_menu_1">
              <div className="tab_var_user">
                <img src={logo_user} alt="пользователь" />
              </div>
              <div className="item_user">
                Профиль
              </div>
            </div>
            <div className="item_menu_2">
              <div className="tab_var_time">
                <img src={logo_time} alt="заказы" />
              </div>
              <div className="item_time">
                Заказы
              </div>
            </div>
          </nav>

          <div className="actionsContainer">
            <div className="item_menu_3">
              <div className="tab_var_exit">
                <img src={logo_exit} alt="vector"/>
              </div>
              <div className="item_exit">
                Выйти
              </div>
            </div>
            <div className="item_menu_4">
              <img src={logo_style} alt="vector"/>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}