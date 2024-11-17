import React from 'react';

const CarCard = ({ car, onClick }) => {
  return (
    <div
      className="border p-4 rounded hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <img src={car.images[0]} alt={car.title} className="w-full h-48 object-cover mb-2" />
      <h2 className="text-xl font-bold">{car.title}</h2>
      <p className="text-gray-700">{car.description}</p>
    </div>
  );
};

export default CarCard;
