import { useEffect, useState } from 'react';
import CarCard from './CarCard';
import '../styles/CarsList.css';

export default function CarsList({ searchQuery }) {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const params = new URLSearchParams({
        limit: 100,
        page: 1,
    });

    fetch(`https://shift-intensive.ru/api/cars/info?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
        if (data.success) {
            setCars(data.data);
        } else {
            console.error('Ошибка загрузки данных:', data.reason);
        }
        })
        .catch(err => console.error('Ошибка запроса:', err))
        .finally(() => setLoading(false));
    }, []);

    const filteredCars = cars.filter((car) =>
        `${car.brand} ${car.name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div className="loader">Загрузка машин...</div>;
    }

    return (
        <div className="cars-сonteiner">
        <div className="cars-list">
            <div className="cars-card">
            {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
            </div>
        </div>
        </div>
    );
}
