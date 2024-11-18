import React, { useState } from 'react';
import AddCar from './AddCar';  // Assuming AddCar is a separate component

const Navbar = () => {
  const [showAddCar, setShowAddCar] = useState(false);

  // Toggle modal visibility
  const handleAddCarClick = () => {
    setShowAddCar(!showAddCar);
  };

  return (
    <div>
      {/* Button to show Add Car form */}
      <button 
        onClick={handleAddCarClick} 
        className="text-white bg-blue-500 p-2 rounded-md hover:bg-blue-700">
        Add Car
      </button>

      {/* Conditionally render the AddCar component/modal */}
      {showAddCar && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/3">
            <AddCar closeModal={() => setShowAddCar(false)} />
            <button
              onClick={handleAddCarClick}
              className="text-red-500 mt-4 ml-auto block font-semibold hover:text-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
