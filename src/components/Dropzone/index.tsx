import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';

const Dropzone: React.FC<{ onFileUpload?: (file: File) => void }> = ({
  onFileUpload = () => {},
}) => {
  const [preview, setPreview] = React.useState<string | null>(null);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
          onFileUpload(file);
        };
        reader.readAsDataURL(file);
      }
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #ccc',
        borderRadius: '50%',
        width: 120,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        bgcolor: isDragActive ? '#f0f0f0' : 'transparent',
        transition: 'background-color 0.3s',
        overflow: 'hidden',
      }}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          {isDragActive ? 'Drop here!' : 'Upload'}
        </Typography>
      )}
    </Box>
  );
};

export default Dropzone;
