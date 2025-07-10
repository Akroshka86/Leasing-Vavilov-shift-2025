import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/CarDetails.css';
import btnImg from '../assets/logo_btn.png';
import lineImg from '../assets/logo-line.png';
import { useLocation } from 'react-router-dom';
import useStateManager from './StateManager';

export default function CarDetails() {
    const { carId } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const rentalPeriod = useStateManager(state => state.rentalPeriod);
    let rentalDays = 0;
    if (rentalPeriod?.startDate && rentalPeriod?.endDate) {
        const start = new Date(rentalPeriod.startDate);
        const end = new Date(rentalPeriod.endDate);
        const diffTime = end - start;
        rentalDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    const bodyTypeMap = {
        suv: "Внедорожник",
        cabriolet: "Кабриолет",
        sedan: "Седан",
        hatchback: "Хэтчбек",
        coupe: "Купе",
        pickup: "Пикап",
        minivan: "Минивэн",
        universal: "Универсал",
    };
    const colorType = {
        silver:"Серебристый",
        orange:"Оранжевый",
        white:"Белый",
        grey:"Серый",
        black:"Черный",
        red:"Красный",
        blue:"Синий",
    };

    




  useEffect(() => {
    fetch(`https://shift-intensive.ru/api/cars/info/${carId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCar(data.data);
        } else {
          console.error('Ошибка загрузки данных:', data.reason);
        }
      })
      .catch((err) => console.error('Ошибка запроса:', err))
      .finally(() => setLoading(false));
  }, [carId]);

  if (loading) return <div className="loader">Загрузка данных...</div>;
  if (!car) return <div className="error">Машина не найдена</div>;

  const cover = car.media.find((m) => m.isCover)?.url || '';
  const otherImages = car.media.filter((m) => !m.isCover);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long'
    });
    };

    const getDayWord = (num) => {
        if (num % 10 === 1 && num % 100 !== 11) return 'день';
        if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) return 'дня';
        return 'дней';
    };

    const formattedRange = rentalPeriod.startDate && rentalPeriod.endDate
        ? `${formatDate(rentalPeriod.startDate)} - ${formatDate(rentalPeriod.endDate)}`
        : '';

    const totalPrice = rentalDays > 0 ? car.price * rentalDays : null;

  return (
    <div className="car-details-car">
        <div className="car-details-back">
            <button className="back-button" onClick={() => navigate(-1)}>
            <div className="back-button-vector">
                <img src={btnImg} alt="vector" />
            </div>
            <div className="back-button-name">Назад</div>
            </button>
        </div>

        <div className="car-details-content">
            <div className="box-images">
                <div className="car-details-content-images">
                    <img
                        className="main-image"
                        src={`https://shift-intensive.ru/api${cover}`}
                        alt={`${car.brand} ${car.name}`}
                    />
                    <div className="secondary-image-box">
                        {otherImages.map((img, index) => (
                        <img
                            className="secondary-image"
                            key={img.id || img.url || index}
                            src={`https://shift-intensive.ru/api${img.url}`}
                            alt="car"
                        />
                        ))}
                        
                    </div>
                </div>
            </div>
            <div className="car-details-content-info">
                <div className="car-details-content-info-text">
                    <div className="car-name">{car.name}</div>

                    <div className="car-specifications">
                        <div className="car-specifications-text">Характеристики</div>
                        <img src={lineImg} alt="line" />

                        <div className="specifications-box">
                            <div className="specifications-box-text">Коробка передач</div>
                            <div className="specifications-box-info">
                            {car.transmission === 'automatic' ? 'Автомат' : 'Механика'}
                            </div>
                        </div>
                        <img src={lineImg} alt="line" />

                        <div className="specifications-box">
                            <div className="specifications-box-text">Руль</div>
                            <div className="specifications-box-info">
                                {car.steering === 'left' ? 'Левый' : 'Правый'}
                            </div>
                        </div>
                        <img src={lineImg} alt="line" />
                        
                        

                        <div className="specifications-box">
                            <div className="specifications-box-text">Тип кузова</div>
                            <div className="specifications-box-info">
                                {bodyTypeMap[car.bodyType] || 'Неизвестно'}
                            </div>
                        </div>
                        <img src={lineImg} alt="line" />
                        

                        <div className="specifications-box">
                            <div className="specifications-box-text">Цвет</div>
                            <div className="specifications-box-info">
                                {colorType[car.color] || 'Неизвестно'}
                            </div>
                        </div>
                    </div>

                    <div className="car-cost">
                        <div className="car-specifications-text">Стоимость</div>
                        <img src={lineImg} alt="line" />

                        <div className="specifications-box">
                            <div className="specifications-box-text">Аренда на {rentalDays} {getDayWord(rentalDays)}</div>
                            <div className="specifications-box-info">{formattedRange}</div>
                        </div>
                        <img src={lineImg} alt="line" />

                        <div className="specifications-box">
                            <div className="specifications-box-text">Итого</div>
                            <div className="specifications-box-info">
                                {totalPrice ? `${totalPrice.toLocaleString()} ₽` : '—'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="car-details-content-info-btn">
                    <button className="back-button-outline" onClick={() => navigate(-1)}>Назад</button>
                    <button className="book-button">Забронировать</button>
                </div>
            </div>
        </div>
    </div>
  );
}