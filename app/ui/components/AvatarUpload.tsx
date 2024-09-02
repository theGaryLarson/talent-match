"use client";

import { ChangeEvent, useState } from 'react';
import {Avatar, AvatarImageProps} from 'flowbite-react';

interface Props {
  id: string,
  fileTypeText: string,
  accept: string,
  maxSizeMB: number,
  userId: string,
  onImageUpload: (url: string)  => void;
}

export default function AvatarUpload({
  id,
  fileTypeText,
  accept,
  maxSizeMB,
  userId,
  onImageUpload,
}: Props) {
  const [filesizeExceeded, setFilesizeExceeded] = useState(false);
  const [fileSelected, setFileSelected] = useState("");
  const [filePath, setFilePath] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const file = event.target.files[0];
      setFileSelected(file.name);

      if (filePath != "") URL.revokeObjectURL(filePath);
      setFilePath(URL.createObjectURL(file));

      const maxSize = 1048576 * maxSizeMB;
      if (file.size > maxSize) { // file is too large
        setFilesizeExceeded(true);
        setUploadError("File size exceeded. Please use file less than 5MB.")
        return;
      }
      else setFilesizeExceeded(false); // file juuuust right

      try {
        // Convert file to buffer
        const fileBuffer = await file.arrayBuffer();
        const fileBufferView = Array.from(new Uint8Array(fileBuffer)); // Convert to array for JSON serialization

        // Prepare the payload
        const payload = {
          file: fileBufferView,
          fileName: file.name,
          userId: userId,
        };

        // Make a POST request to the API route
        const response = await fetch('/api/users/avatar/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        // Check if the upload was successful
        if (response.ok) {
          const result = await response.json();
          onImageUpload(result.imageUrl); // Return the image URL to the parent component
        } else {
          const errorData = await response.json();
          setUploadError(errorData.error || 'Failed to upload image');
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploadError("Failed to upload image. Please try again.");
      }

    } else {
      setFileSelected(""); // no file selected
      if (filePath !== "") URL.revokeObjectURL(filePath);
    }
  }

  let validFiletype = true;
  if (fileSelected != "") {
    const fileType = fileSelected.substring(fileSelected.lastIndexOf("."), fileSelected.length);
    validFiletype = accept.split(",").includes(fileType);
  }


  const fileTypeTextPlusSizeLimit = fileTypeText + " (max. " + maxSizeMB + " MB)";

  // it was getting late and playing around. Feel free to implement this however you find best :)
  const imageProps: AvatarImageProps = {
    className: "w-20 h-20 rounded-full object-cover", // Ensure the image is a perfect circle
    "data-testid": "avatar-image",
  };

  return (
    <div>
      <label className="flex p-4 hover:bg-slate-50 rounded-full cursor-pointer">
        <Avatar
          rounded
          // img={filePath}
          img={(props) => (
              <img src={filePath} alt="Uploaded Avatar" {...props} {...imageProps} />
          )}
          className="w-20 h-20 flex-shrink-0"
          />
        <input type="file"
          id={id}
          name={id}
          className="sr-only"
          accept={accept}
          onChange={handleChange}
        />
        <div className="px-6">
          {fileSelected == "" && 
            <p className="text-sky-400 uppercase font-medium">Upload Image</p>}
          {fileSelected != "" && !filesizeExceeded && validFiletype && 
            <p className="text-gray-400 uppercase font-medium">{fileSelected}</p>}
          {fileSelected != "" && !filesizeExceeded && !validFiletype && 
            <p className="font-medium text-red-500 dark:text-red-400">Unsupported file type: {fileSelected}</p>}
          {fileSelected != "" && filesizeExceeded && 
            <p className="font-medium text-red-500 dark:text-red-400">File is too large: {fileSelected}</p>}
          <p className="text-sm">{fileTypeTextPlusSizeLimit}</p>
        </div>
      </label>
    </div>
  );
}