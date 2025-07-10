import { useState, useRef, useEffect } from 'react';
import { ru } from 'date-fns/locale';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../styles/SearchBar.css';
import searchImg from '../assets/logo_search.png';

export default function SearchBar({ setSearchQuery, setRentalPeriod }) {
  const [rentalDate, setRentalDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const calendarRef = useRef(null);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelect = (ranges) => {
  setDateRange([ranges.selection]);

  const { startDate, endDate } = ranges.selection;


  if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
    applyDate(ranges.selection);
    setShowModal(false);
  }
};

const applyDate = (selection = dateRange[0]) => {
  const startDate = selection.startDate;
  const endDate = selection.endDate;

  const optionsDay = { day: '2-digit' };
  const optionsMonthYear = { month: 'long', year: 'numeric' };

  const dayStart = startDate.toLocaleDateString('ru-RU', optionsDay);
  const dayEnd = endDate.toLocaleDateString('ru-RU', optionsDay);
  const monthYear = endDate.toLocaleDateString('ru-RU', optionsMonthYear);

  const diffTime = endDate - startDate;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const formatted = `${dayStart} - ${dayEnd} ${monthYear} (${diffDays} ${getDayWord(diffDays)})`;

  setRentalDate(formatted);
  setShowModal(false);
  setRentalPeriod({
    startDate,
    endDate,
    days: diffDays
  });
};

  const getDayWord = (num) => {
    if (num % 10 === 1 && num % 100 !== 11) return 'день';
    if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) return 'дня';
    return 'дней';
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

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
              onClick={() => setShowModal(true)}
              readOnly
            />
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

      {showModal && (
        <div className="calendar-dropdown" ref={calendarRef}>
          <div className="calendar-content">
            <DateRange
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              locale={ru}
            />
            <button className="apply-button" onClick={applyDate}>Выбрать</button>
          </div>
        </div>
      )}
    </div>
  );
}