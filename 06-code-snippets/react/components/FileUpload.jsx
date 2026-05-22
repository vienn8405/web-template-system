import React, { useState, useRef } from 'react';

/**
 * FileUpload Component
 *
 * A file upload component with drag & drop support
 * Supports single and multiple file uploads with preview
 *
 * @example
 * <FileUpload
 *   accept="image/*"
 *   onChange={handleFileChange}
 *   maxSize={5 * 1024 * 1024} // 5MB
 * />
 */

export function FileUpload({
  accept = '*',
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  onChange,
  label = '',
  helperText = '',
  error = false,
  disabled = false,
  showPreview = true,
  className = '',
  ...props
}) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Validate file
  const validateFile = (file) => {
    if (file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)}`;
    }
    return null;
  };

  // Handle file selection
  const handleFiles = (selectedFiles) => {
    setErrorMessage('');
    const fileArray = Array.from(selectedFiles);

    // Validate files
    const validFiles = [];
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        setErrorMessage(error);
        return;
      }
      validFiles.push(file);
    }

    // Add preview URLs for images
    const filesWithPreview = validFiles.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    const newFiles = multiple ? [...files, ...filesWithPreview] : filesWithPreview;
    setFiles(newFiles);

    if (onChange) {
      onChange(multiple ? newFiles.map(f => f.file) : newFiles[0]?.file);
    }
  };

  // Handle file input change
  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  // Remove file
  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);

    if (onChange) {
      onChange(multiple ? newFiles.map(f => f.file) : null);
    }
  };

  // Open file dialog
  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
        </label>
      )}

      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`
          relative border-2 border-dashed rounded-lg p-6
          transition-all duration-200
          ${isDragging
            ? 'border-primary-500 bg-primary-50'
            : error || errorMessage
            ? 'border-error-500 bg-error-50'
            : 'border-neutral-300 bg-neutral-50'
          }
          ${disabled
            ? 'opacity-60 cursor-not-allowed'
            : 'cursor-pointer hover:border-primary-400 hover:bg-primary-50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
          {...props}
        />

        <div className="text-center">
          {/* Upload Icon */}
          <svg
            className="mx-auto h-12 w-12 text-neutral-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Text */}
          <div className="mt-4">
            <p className="text-sm text-neutral-600">
              <span className="font-semibold text-primary-600">Click to upload</span>
              {' '}or drag and drop
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {accept === '*' ? 'Any file type' : accept}
              {' • '}
              Max {formatFileSize(maxSize)}
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {(errorMessage || (error && helperText)) && (
        <p className="mt-2 text-sm text-error-500">
          {errorMessage || helperText}
        </p>
      )}

      {/* Helper Text */}
      {!error && !errorMessage && helperText && (
        <p className="mt-2 text-sm text-neutral-500">
          {helperText}
        </p>
      )}

      {/* File Preview */}
      {showPreview && files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((fileData, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg"
            >
              {/* Image Preview or File Icon */}
              {fileData.preview ? (
                <img
                  src={fileData.preview}
                  alt={fileData.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-neutral-100 rounded">
                  <svg
                    className="w-6 h-6 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">
                  {fileData.name}
                </p>
                <p className="text-xs text-neutral-500">
                  {formatFileSize(fileData.size)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="p-1 text-neutral-400 hover:text-error-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Usage Examples:

/*
// Basic File Upload
<FileUpload
  accept="image/*"
  onChange={(file) => console.log(file)}
  label="Upload Image"
/>

// Multiple Files
<FileUpload
  multiple
  accept="image/*,application/pdf"
  onChange={(files) => console.log(files)}
  label="Upload Documents"
  helperText="You can upload multiple images or PDFs"
/>

// With Size Limit
<FileUpload
  accept="image/*"
  maxSize={2 * 1024 * 1024} // 2MB
  onChange={handleUpload}
  label="Profile Picture"
  helperText="Max file size: 2MB"
/>

// With Error
<FileUpload
  accept="image/*"
  onChange={handleUpload}
  label="Upload Image"
  error
  helperText="Please upload a valid image file"
/>

// Disabled
<FileUpload
  disabled
  label="Upload (Disabled)"
/>

// Without Preview
<FileUpload
  showPreview={false}
  onChange={handleUpload}
/>
*/
