import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import { useTheme } from "../../context/ThemeContext";

const ProfilePhoto = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { darkMode } = useTheme();

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
        <div
          className={`w-16 h-16 flex items-center justify-center rounded-full relative transition
            ${darkMode ? "bg-gray-800" : "bg-purple-100"}
          `}
        >
          <LuUser
            className={`text-4xl ${
              darkMode ? "text-gray-300" : "text-primary"
            }`}
          />

          {/* UPLOAD BUTTON (keep primary) */}
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="w-8 h-8 flex items-center justify-center rounded-full
              bg-primary text-white absolute -bottom-1 -right-1"
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

          {/* REMOVE BUTTON (keep red) */}
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center
              bg-red-500 hover:bg-red-600 text-white rounded-full
              absolute -bottom-1 -right-1 transition"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
