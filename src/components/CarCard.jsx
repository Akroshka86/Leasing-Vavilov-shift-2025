import { Link } from 'react-router-dom';
import '../styles/CarCard.css';
import useStateManager from './StateManager';

export default function CarCard({ car}) {
  const cover = car.media.find((m) => m.isCover)?.url || '';
  const rentalPeriod = useStateManager((state) => state.rentalPeriod);
  let rentalDays = 0;
  if (rentalPeriod?.startDate && rentalPeriod?.endDate) {
    const start = new Date(rentalPeriod.startDate);
    const end = new Date(rentalPeriod.endDate);
    const diffTime = end - start;
    rentalDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }
  const totalPrice = car.price * rentalDays;

  

  return (
    <div className="car-card">
        <Link to={`/car/${car.id}`} state={{ rentalPeriod }} className="car-card">
        <img
            src={`https://shift-intensive.ru/api${cover}`}
            alt={`${car.brand} ${car.name}`}
            className="car-image"
        />
        </Link>
      <div className="car-card-content">
        <div className="car-card-content-text">
          <h3 className="car-title">{car.name}</h3>
          <p className="car-details">
            {car.transmission === 'automatic' ? 'Автомат' : 'Механика'}
          </p>
        </div>
        <div className="car-card-content-button">
          <div className="car-card-content-button-price">
            <p className="car-price">{car.price.toLocaleString()} ₽</p>
            {rentalDays > 0 && (
              <p className="car-date-price">
                {totalPrice.toLocaleString()} ₽ за {rentalDays} {getDayWord(rentalDays)}
              </p>
            )}
          </div>
          <Link to={`/car/${car.id}`}>
          <button className="car-card-content-button-btn">
            Выбрать
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const getDayWord = (num) => {
  if (num % 10 === 1 && num % 100 !== 11) return 'день';
  if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) return 'дня';
  return 'дней';
};
