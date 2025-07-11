import '../styles/Header.css';
import logo_car from '../assets/logo_car.svg';
import logo_user from '../assets/logo_user.svg';
import logo_time from '../assets/logo_time.svg';
import logo_exit from '../assets/logo_exit.svg';
import logo_style from '../assets/logo_style.svg';
import useThemeStore from '../components/ThemeStore';
import logo_style_2 from '../assets/logo_style_2.svg';
import logo_exit_2 from '../assets/logo_exit_2.svg';
import logo_time_2 from '../assets/logo_time_2.svg';
import logo_user_2 from '../assets/logo_user_2.svg';



export default function Header() {

  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);

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
                <img src={theme === 'dark' ? logo_user : logo_user_2} alt="пользователь" />
              </div>
              <div className="item_user">
                Профиль
              </div>
            </div>
            <div className="item_menu_2">
              <div className="tab_var_time">
                <img src={theme === 'dark' ? logo_time : logo_time_2} alt="заказы" />
              </div>
              <div className="item_time">
                Заказы
              </div>
            </div>
          </nav>

          <div className="actionsContainer">
            <div className="item_menu_3">
              <div className="tab_var_exit">
                <img src={theme === 'dark' ? logo_exit : logo_exit_2} alt="vector"/>
              </div>
              <div className="item_exit">
                Выйти
              </div>
            </div>
            <div className="item_menu_4" onClick={toggleTheme}>
              <img src={theme === 'dark' ? logo_style : logo_style_2} alt="theme toggle" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}