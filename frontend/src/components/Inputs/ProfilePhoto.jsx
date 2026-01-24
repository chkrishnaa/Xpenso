import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhoto = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage((prev) => ({
      ...prev,
      image: file,
    }));

    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage((prev) => ({
      ...prev,
      image: null,
    }));
    setPreviewUrl(null);
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white absolute -bottom-1 -right-1"
            onClick={() => inputRef.current.click()}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="User Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
