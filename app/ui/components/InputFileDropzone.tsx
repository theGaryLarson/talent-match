'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { FormLabel, SxProps } from '@mui/material';
import { BlobPrefix } from '@/app/lib/services/azureBlobService';

interface Props {
  id: string;
  fileTypeText: string;
  blobPrefix: BlobPrefix;
  accept: string;
  maxSizeMB: number;
  userId: string;
  onDocUpload: (url: string) => void;
  autoloadedUrl?: string;
}

export default function InputFileDropzone({
  id,
  fileTypeText,
  blobPrefix,
  accept,
  maxSizeMB,
  userId,
  onDocUpload,
  autoloadedUrl,
}: Props) {
  const [filesizeExceeded, setFilesizeExceeded] = useState(false);
  const [fileSelected, setFileSelected] = useState(autoloadedUrl ?? '');
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (autoloadedUrl) {
      setFileSelected(autoloadedUrl);
    }
  }, [autoloadedUrl]);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const file = event.target.files[0];
      setFileSelected(file.name);
      const maxSize = 1048576 * maxSizeMB;
      if (file.size > maxSize) {
        // file is too large
        setFilesizeExceeded(true);
      } else setFilesizeExceeded(false); // file juuuust right

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
        const response = await fetch(`/api/jobseekers/${blobPrefix}/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        // Check if the upload was successful
        if (response.ok) {
          const result = await response.json();
          onDocUpload(result.imageUrl); // Return the image URL to the parent component
        } else {
          const errorData = await response.json();
          setUploadError(errorData.error || 'Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploadError('Failed to upload image. Please try again.');
      }
    } else setFileSelected(''); // no file selected
  };

  let validFiletype = true;
  if (fileSelected != '') {
    const fileType = fileSelected.substring(
      fileSelected.lastIndexOf('.'),
      fileSelected.length,
    );
    validFiletype = accept.split(',').includes(fileType);
  }

  const fileTypeTextPlusSizeLimit =
    fileTypeText + ' (max. ' + maxSizeMB + ' MB)';

  let backgroundCSS: SxProps = {
    borderColor: 'rgb(209, 213, 219)', // Tailwind's border-gray-300
    backgroundColor: 'rgb(249, 250, 251)', // Tailwind's bg-gray-50
    '&:hover': {
      backgroundColor: 'rgb(243, 244, 246)', // Tailwind's hover:bg-gray-100
    },
    // '@media (prefers-color-scheme: dark)': {
    //   borderColor: 'rgb(75, 85, 99)', // Tailwind's dark:border-gray-600
    //   backgroundColor: 'rgb(55, 65, 81)', // Tailwind's dark:bg-gray-700
    //   '&:hover': {
    //     borderColor: 'rgb(107, 114, 128)', // Tailwind's dark:hover:border-gray-500
    //     backgroundColor: 'rgb(75, 85, 99)', // Tailwind's dark:hover:bg-gray-600
    //   },
    // },
  };
  let svgCSS = 'text-sky-500 dark:text-sky-400';

  if (
    (!validFiletype || filesizeExceeded) &&
    !fileSelected.startsWith('http')
  ) {
    backgroundCSS = {
      borderColor: 'rgb(252, 165, 165)', // Tailwind's border-red-300
      backgroundColor: 'rgb(254, 242, 242)', // Tailwind's bg-red-50
      '&:hover': {
        backgroundColor: 'rgb(254, 226, 226)', // Tailwind's hover:bg-red-100
      },
      // '@media (prefers-color-scheme: dark)': {
      //   borderColor: 'rgb(153, 27, 27)', // Tailwind's dark:border-red-600
      //   backgroundColor: 'rgb(127, 29, 29)', // Tailwind's dark:bg-red-700
      //   '&:hover': {
      //     borderColor: 'rgb(185, 28, 28)', // Tailwind's dark:hover:border-red-500
      //     backgroundColor: 'rgb(153, 27, 27)', // Tailwind's dark:hover:bg-red-600
      //   },
      // },
    };

    svgCSS = 'text-red-500 dark:text-red-400';
  } else if (fileSelected != '') {
    svgCSS = 'text-gray-500 dark:text-gray-400';
  }

  backgroundCSS = {
    ...backgroundCSS,
    display: 'flex', // Tailwind's flex
    width: '100%', // Tailwind's w-full
    cursor: 'pointer', // Tailwind's cursor-pointer
    flexDirection: 'column', // Tailwind's flex-col
    alignItems: 'center', // Tailwind's items-center
    justifyContent: 'center', // Tailwind's justify-center
    borderRadius: '0.5rem', // Tailwind's rounded-lg
    border: '2px dashed', // Tailwind's border-2 border-dashed
  };
  svgCSS = svgCSS.concat('h-8 w-8 mr-2');

  return (
    <div className="relative flex w-full items-center justify-center">
      <FormLabel htmlFor={id} sx={backgroundCSS}>
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <div className="flex flex-row items-center">
            <svg
              className={svgCSS}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            {fileSelected == '' && (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="text-sky-400 underline">Click to upload</span>{' '}
                or drag and drop
              </p>
            )}
            {fileSelected != '' && !filesizeExceeded && validFiletype && (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                {fileSelected}
              </p>
            )}
            {fileSelected != '' &&
              !filesizeExceeded &&
              !validFiletype &&
              !fileSelected.startsWith('http') && (
                <p className="mb-2 text-sm text-red-500 dark:text-red-400">
                  Unsupported file type: {fileSelected}
                </p>
              )}
            {fileSelected != '' &&
              !filesizeExceeded &&
              !validFiletype &&
              fileSelected.startsWith('http') && (
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {(() => {
                    const filePath = fileSelected.split('?')[0];
                    const lastSlash = filePath.lastIndexOf('/');
                    return filePath.substring(lastSlash + 1);
                  })()}
                </p>
              )}
            {fileSelected != '' && filesizeExceeded && (
              <p className="mb-2 text-sm text-red-500 dark:text-red-400">
                File is too large! {/*{fileSelected}*/}
              </p>
            )}
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            {fileTypeTextPlusSizeLimit}
          </p>
        </div>
        <input
          type="file"
          id={id}
          name={id}
          className="absolute left-0 top-0 block h-full w-full cursor-pointer opacity-0"
          accept={accept}
          onChange={handleChange}
        />
      </FormLabel>
    </div>
  );
}
