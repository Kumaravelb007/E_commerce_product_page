import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ 
  value = '', 
  onChange, 
  label = 'Upload Image',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  className = ''
}) => {
  const [preview, setPreview] = useState(value);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      onChange(file);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview('');
    onChange(null);
    setError('');
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    onChange(url);
    setError('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Image Preview */}
      {preview && (
        <div className="relative w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* File Upload */}
      <div className="flex items-center space-x-4">
        <label className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-colors">
          <Upload className="w-4 h-4 mr-2" />
          Choose File
          <input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
        <span className="text-sm text-gray-500">
          Max size: {maxSize / (1024 * 1024)}MB
        </span>
      </div>

      {/* URL Input */}
      <div className="relative">
        <input
          type="url"
          value={typeof value === 'string' ? value : ''}
          onChange={handleUrlChange}
          className="w-full input-field pl-10"
          placeholder="Or enter image URL"
        />
        <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
