import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CarsList from './components/CarsList';
import CarDetails from './components/CarDetails';
import { ROUTES } from './routes/paths';
import './styles/App.css';
import useThemeStore from './components/ThemeStore';

export default function App() {
  const theme = useThemeStore((state) => state.theme);

  const [searchQuery, setSearchQuery] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState({
    startDate: null,
    endDate: null,
    days: 0,
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);


  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar setSearchQuery={setSearchQuery} setRentalPeriod={setRentalPeriod}/>
              <CarsList searchQuery={searchQuery} rentalPeriod={rentalPeriod} />
            </>
          }
        />
        <Route path={ROUTES.CAR_DETAILS} element={<CarDetails />} />
      </Routes>
    </Router>
  );
}
