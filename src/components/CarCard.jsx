import '../styles/CarCard.css';

export default function CarCard({ car }) {
  const cover = car.media.find((m) => m.isCover)?.url || '';

  return (
    <div className="car-card">
      <img
        src={`https://shift-intensive.ru/api${cover}`}
        alt={`${car.brand} ${car.name}`}
        className="car-image"
      />
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
            <p className="car-date-price">{car.price.toLocaleString()} ₽</p>
          </div>
          <button className="car-card-content-button-btn">
            <span className="car-card-content-button-btn-text">Выбрать</span>
          </button>
        </div>
      </div>
    </div>
  );
}
