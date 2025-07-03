import '../styles/Header.css';
import vectorImg from '../assets/logo_car.png';
import userImg from '../assets/logo_user.png';
import timeImg from '../assets/logo_time.png';
import exitImg from '../assets/logo_exit.png';
import styleImg from '../assets/logo_style.png';


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
                <img src={vectorImg} alt="vector"/>
            </div>
        </div>

        {/* Меню и действия */}
        <div className="menu">
          
          <nav className="desktopNavigation">
            <div className="item_menu_1">
              <div className="tab_var_user">
                <img src={userImg} alt="vector"/>
              </div>
              <div className="item_user">
                Профиль
              </div>
            </div>
            <div className="item_menu_2">
              <div className="tab_var_time">
                <img src={timeImg} alt="vector"/>
              </div>
              <div className="item_time">
                Заказы
              </div>
            </div>
          </nav>

          <div className="actionsContainer">
            <div className="item_menu_3">
              <div className="tab_var_exit">
                <img src={exitImg} alt="vector"/>
              </div>
              <div className="item_exit">
                Выйти
              </div>
            </div>
            <div className="item_menu_4">
              <img src={styleImg} alt="vector"/>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}