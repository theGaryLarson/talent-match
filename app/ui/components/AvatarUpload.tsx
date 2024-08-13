"use client";

import { ChangeEvent, useState } from 'react';
import { FileInput, Label } from "flowbite-react";
import { Avatar } from 'flowbite-react';

interface Props {
  id: string,
  fileTypeText: string,
  accept: string,
  maxSizeMB: number,
}

export default function AvatarUpload({
  id,
  fileTypeText,
  accept,
  maxSizeMB,
}: Props) {
  const [filesizeExceeded, setFilesizeExceeded] = useState(false);
  const [fileSelected, setFileSelected] = useState("");
  const [filePath, setFilePath] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      setFileSelected(event.target.files[0].name);

      if (filePath != "") URL.revokeObjectURL(filePath);
      setFilePath(URL.createObjectURL(event.target.files[0]));

      const maxSize = 1048576 * maxSizeMB;
      if (event.target.files[0].size > maxSize) { // file is too large
        setFilesizeExceeded(true);
      }
      else setFilesizeExceeded(false); // file juuuust right
    }
    else {
      setFileSelected(""); // no file selected
      if (filePath != "") URL.revokeObjectURL(filePath);
    }
  }

  var validFiletype = true;
  if (fileSelected != "") {
    const fileType = fileSelected.substring(fileSelected.lastIndexOf("."), fileSelected.length);
    console.log(fileType)
    validFiletype = accept.split(",").includes(fileType);
  }

  const fileTypeTextPlusSizeLimit = fileTypeText + " (max. " + maxSizeMB + " MB)";
  


  return (
    <div>
      <label className="flex p-4 hover:bg-slate-50 rounded-full">
        <Avatar rounded 
          img={filePath}
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