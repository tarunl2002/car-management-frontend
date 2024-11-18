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
      <div className="container w-full mx-auto p-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='bg-white rounded-lg border my-2 px-3 w-full'
        />
        <div className="grid grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} onClick={() => navigate(`/cars/${car.id}`)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarList;
