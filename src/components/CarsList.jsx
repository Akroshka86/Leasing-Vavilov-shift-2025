import { useEffect, useState } from 'react';
import CarCard from './CarCard';
import '../styles/CarsList.css';

const ITEMS_PER_PAGE = 10;

export default function CarsList({ searchQuery }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="loader">Загрузка машин...</div>;
  }

  return (
    <div className="cars-сonteiner">
      <div className="cars-list">
        <div className="cars-card">
          {paginatedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        {/* Пагинация */}
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            ← Назад
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Вперёд →
          </button>
        </div>
      </div>
    </div>
  );
}