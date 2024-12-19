import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import './index.scss';

const Dropzone = ({ onDrop, accept = 'image/*', maxFiles = 1, photoURL, ...props }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
  });

  return (
    <div {...getRootProps()} {...props} className="dropzone">
      <input {...getInputProps()} />
      {photoURL ? (
        <Image 
          src={photoURL} 
          alt="" 
          width={120} 
          height={120} 
          />
      ) : isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag and drop files here, or click to select files</p>
      )}
    </div>
  );
};

export default Dropzone;
