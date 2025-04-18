import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

const ImageUploader = () => {
  const { uploadProfileImage } = useAuthStore();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setUploading(true);
    await uploadProfileImage(selectedFile);

    setUploading(false);
  };

  return (
<div className="flex items-center space-x-4"> {/* Use flex to align horizontally */}
      <input
        type="file"
        accept="image/*"
        className="file-input max-w-xs file-input-bordered"
        onChange={handleFileChange}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-primary-yellow text-white px-3 py-2"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default ImageUploader;