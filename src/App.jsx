import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CarsList from './components/CarsList';
import './styles/App.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rentalDays, setRentalDays] = useState(0); // количество дней аренды

  return (
    <>
      <Header />
      <SearchBar setSearchQuery={setSearchQuery} setRentalDays={setRentalDays} />
      <CarsList searchQuery={searchQuery} rentalDays={rentalDays} />
    </>
  );
}
