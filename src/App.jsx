import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CarsList from './components/CarsList';
import './styles/App.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header />
      <SearchBar setSearchQuery={setSearchQuery} />
      <main>
        <CarsList searchQuery={searchQuery} />
      </main>
    </>
  );
}
