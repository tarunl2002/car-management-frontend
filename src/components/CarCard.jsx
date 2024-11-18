import React, { useState } from "react";
import { updateCar, deleteCar } from "../utils/api";

const CarCard = ({ car, onEditSuccess, onDeleteSuccess }) => {
  const [newImages, setNewImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(car.title);
  const [editedDescription, setEditedDescription] = useState(car.description);
  const [editedTags, setEditedTags] = useState(
    Array.isArray(car.tags) ? car.tags : JSON.parse(car.tags || "[]")
  );

  // Handle Edit Button
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files); // Store the uploaded images in state
  };

  // Handle Tag Changes
  const handleTagAdd = () => {
    const newTag = prompt("Enter a new tag:");
    if (newTag && !editedTags.includes(newTag)) {
      setEditedTags([...editedTags, newTag]);
    }
  };

  const handleTagRemove = (index) => {
    const updatedTags = editedTags.filter((_, i) => i !== index);
    setEditedTags(updatedTags);
  };

  // Handle Submit Edit
  const handleSubmitEdit = async () => {
    const formData = new FormData();
    formData.append("title", editedTitle);
    formData.append("description", editedDescription);
    formData.append("tags", JSON.stringify(editedTags));

    // Append new images to form data
    newImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const updatedCar = await updateCar(car._id, formData);
      alert("Car updated successfully!");
      onEditSuccess(updatedCar); // Notify parent about the update
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      alert("Failed to update car.");
    }
  };

  // Handle Delete Button
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${car.title}"?`)) {
      try {
        await deleteCar(car._id);
        alert("Car deleted successfully!");
        onDeleteSuccess(car._id); // Notify parent about the delete
      } catch (error) {
        alert("Failed to delete car.");
      }
    }
  };

  return (
    <div className="border border-white p-4 rounded hover:shadow-lg">
      {/* Image */}
      <img
        src={car.images[0] || "https://via.placeholder.com/150"}
        alt={car.title}
        className="w-full h-48 object-cover mb-2"
      />

      {/* Title */}
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="text-xl font-bold mb-2 w-full p-2 border rounded"
        />
      ) : (
        <h2 className="text-xl font-bold">{car.title}</h2>
      )}

      {/* Description */}
      {isEditing ? (
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="text-gray-700 mb-2 w-full p-2 border rounded"
        />
      ) : (
        <p className="text-gray-700">{car.description || "No description available."}</p>
      )}

      {/* Tags Section */}
      <div className="mt-2">
        <h3 className="text-lg font-semibold">Tags:</h3>
        {isEditing ? (
          <div className="flex flex-wrap gap-2 mt-1">
            {editedTags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleTagRemove(index)}
                  className="ml-2 text-red-500 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={handleTagAdd}
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
            >
              + Add Tag
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {editedTags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image Upload */}
      {isEditing && (
        <div className="mt-4">
          <label htmlFor="car-images" className="text-sm text-gray-700">
            Upload Images (up to 10):
          </label>
          <input
            id="car-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-2"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        {isEditing ? (
          <button
            onClick={handleSubmitEdit}
            className="text-green-500 hover:text-green-700 font-semibold"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarCard;
