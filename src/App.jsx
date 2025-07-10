import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CarsList from './components/CarsList';
import CarDetails from './components/CarDetails';
import './styles/App.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rentalDays, setRentalDays] = useState(0); // количество дней аренды


  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar setSearchQuery={setSearchQuery} setRentalDays={setRentalDays} />
              <CarsList searchQuery={searchQuery} rentalDays={rentalDays} />
            </>
          }
        />
        <Route path="/car/:carId" element={<CarDetails />} />
      </Routes>
    </Router>
  );
}
