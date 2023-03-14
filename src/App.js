import { useEffect, useState } from "react";
import React from 'react';
import '../src/App.css'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);
    setImages((prevState) => [...prevState, ...uploadedImages]);
  };

  const handleImageSelect = (selectedImage) => {
    setSelectedImages((prevState) => [...prevState, selectedImage]);
  };

  const handleImageDeselect = (deselectedImage) => {
    setSelectedImages((prevState) =>
      prevState.filter((image) => image !== deselectedImage)
    );
  };

  const handleBulkAction = (actionType) => {
    if (actionType === "delete") {
      setImages((prevState) =>
        prevState.filter((image) => !selectedImages.includes(image))
      );
      setSelectedImages([]);
    } else if (actionType === "download") {
      selectedImages.forEach((image) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(image);
        downloadLink.download = image.name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    }
  };
  

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App" style={{ backgroundColor: '#f1f1f1', padding: '20px' }}>
      <div>
      <input type="file" id="fileInput" multiple onChange={handleImageUpload} />
      <label htmlFor="fileInput" ><DriveFolderUploadIcon style={{ marginRight: '10px',marginTop:"-10px" }} fontSize="small" />Upload</label>
      </div>

      {filteredImages.map((image) => (
        <div key={image.name}>
          <input
            type="checkbox"
            checked={selectedImages.includes(image)}
            onChange={() =>
              selectedImages.includes(image)
                ? handleImageDeselect(image)
                : handleImageSelect(image)
            }
          />
          {/* <img src={URL.createObjectURL(image)} alt={image.name} /> */}
          {/* <div>{image.name}</div> */}
          {/* <div>{image.size} bytes</div> */}
          {/* <div>{image.type}</div> */}
        </div>
      ))}

      <div>
        <input type="text" value={searchQuery} onChange={handleSearchQuery} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop:'2rem' }} />
      </div>

      <div>
        <button onClick={() => handleBulkAction('delete')} style={{ backgroundColor: '#f44336', color: 'white', padding: '10px', borderRadius: '5px', marginRight: '10px', marginTop:'2rem' }}>
          Delete Selected
        </button>
        <button onClick={() => handleBulkAction('download')} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', borderRadius: '5px', marginTop:'2rem' }}>
          Download Selected
        </button>
      </div>

      <div>
        <button onClick={() => setViewMode('grid')} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', borderRadius: '5px', marginRight: '50px', marginTop:'2rem' }}>Grid View</button>
        <button onClick={() => setViewMode('list')} style={{ backgroundColor: '#f44336', color: 'white', padding: '10px', borderRadius: '5px', marginRight: '10px', marginTop:'2rem'  }}>List View</button>
      </div>
      {viewMode === 'grid' ? (
        <div className="grid-view">
        {filteredImages.map((image) => (
          <div key={image.name} className="image-card">
            <input
              type="checkbox"
              checked={selectedImages.includes(image)}
              onChange={() =>
                selectedImages.includes(image)
                  ? handleImageDeselect(image)
                  : handleImageSelect(image)
              }
            />
            <img src={URL.createObjectURL(image)} alt={image.name} />
            <div className="image-name">{image.name.split('.').slice(0, -1).join('.')}<br></br>{image.name.split('.').pop()}{(image.size / 1024 / 1024).toFixed(2)} MB</div>
          </div>
        ))}
      </div>
      ) : (
        <div className="list-view">
        {filteredImages.map((image) => (
          <div key={image.name} className="image-card">
            <input
              type="checkbox"
              checked={selectedImages.includes(image)}
              onChange={() =>
                selectedImages.includes(image)
                  ? handleImageDeselect(image)
                  : handleImageSelect(image)
              }
            />
            <img src={URL.createObjectURL(image)} alt={image.name} />
            <div className="image-name">{image.name.split('.').slice(0, -1).join('.')}<br></br>{image.name.split('.').pop()}{(image.size / 1024 / 1024).toFixed(2)} MB</div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default App;

