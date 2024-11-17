import React, { useState } from 'react';

const CarForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [tags, setTags] = useState(initialData?.tags.join(', ') || '');
  const [images, setImages] = useState([]);

  const handleImages = (e) => {
    setImages([...e.target.files].slice(0, 10)); // Allow max 10 images
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, tags: tags.split(',').map((t) => t.trim()), images });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full p-2 border mb-4"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full p-2 border mb-4"
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="block w-full p-2 border mb-4"
      />
      <input type="file" multiple onChange={handleImages} className="block w-full mb-4" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
};

export default CarForm;
