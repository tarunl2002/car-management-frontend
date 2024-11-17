import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCars } from '../utils/api';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCars = async () => {
      const data = await fetchCars();
      setCars(data);
    };
    loadCars();
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(search.toLowerCase()) ||
      car.description.toLowerCase().includes(search.toLowerCase()) ||
      car.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full p-2 border mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} onClick={() => navigate(`/cars/${car.id}`)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarList;
