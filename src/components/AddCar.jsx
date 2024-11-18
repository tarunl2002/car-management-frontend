import React, { useState } from "react";
import { createCar } from "../utils/api"; // Function to call the API for adding a car

const AddCar = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]); // Tags stored as an array
  const [inputTag, setInputTag] = useState(""); // For user input
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags)); // Convert tags array to JSON string for API

    // Append images to FormData
    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image); // Append each image as a file
      });
    }

    try {
      await createCar(formData);
      alert("Car added successfully!");
      closeModal(); // Close the modal after submission
    } catch (error) {
      console.error("Error adding car:", error);
      alert(error?.response?.data?.message || "Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  // Handle tag input
  const handleTagInput = (e) => {
    const value = e.target.value.trim();
    if (value.endsWith(",")) {
      const newTag = value.slice(0, -1).trim(); // Remove trailing comma and whitespace
      if (newTag && !tags.includes(newTag)) {
        setTags((prevTags) => [...prevTags, newTag]);
      }
      setInputTag(""); // Clear input field
    } else {
      setInputTag(value); // Update input field as user types
    }
  };

  // Remove a specific tag
  const removeTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length + images.length <= 10) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    } else {
      alert("You can only upload up to 10 images.");
    }
  };

  // Remove a specific image
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-gray-600">
      <h2 className="text-2xl font-bold mb-4">Add New Car</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded bg-gray-300"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded bg-gray-300"
            rows="4"
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-gray-700">Tags</label>
          <input
            type="text"
            value={inputTag}
            onChange={handleTagInput}
            placeholder="Type and press ',' to add tags"
            className="w-full p-2 border rounded bg-gray-300"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-blue-200 text-blue-800 px-3 py-1 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-2 text-red-600 hover:text-red-800 font-bold"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block text-gray-700">Images (up to 10)</label>
          <input
            type="file"
            onChange={handleImageChange}
            multiple
            className="w-full p-2 border rounded"
            accept="image/*"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-20 h-20 border rounded overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 bg-blue-500 text-white rounded ${
              loading && "opacity-50"
            }`}
          >
            {loading ? "Adding..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
