import { useState } from 'react';
import '../styles/SearchBar.css';
import searchImg from '../assets/logo_search.png';

export default function SearchBar({ setSearchQuery }) {
  const [rentalDate, setRentalDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-bar-menu">
        <div className="search-bar-menu-items">
          
          <div className="search-item">
            <label className="searchInput">Поиск</label>
            <input
              type="text"
              id="searchInput"
              placeholder="Поиск"
              onChange={handleInputChange}
            />
          </div>

          <div className="search-date">
            <label className="rentalDate">Дата аренды</label>
            <input
              type="text"
              id="dateInput"
              placeholder="Выберите даты"
              value={rentalDate}
              onFocus={() => setShowCalendar(true)}
              readOnly
            />
            {showCalendar && (
              <div className="calendar-popup">
                <p>Тут будет календарь выбора диапазона дат</p>
                <button onClick={() => setShowCalendar(false)}>Закрыть</button>
              </div>
            )}
          </div>

          <button className="filter-button">
            <div className="filter-button-logo">
              <img src={searchImg} alt="vector" />
            </div>
            <div className="filter-button-text-box">
              <span className="filter-button-text">Фильтр</span>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
