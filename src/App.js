import { useEffect, useState } from "react";
import React from "react";
import "../src/App.css";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import GridOnIcon from "@mui/icons-material/GridOn";
import ListIcon from "@mui/icons-material/List";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DownloadIcon from "@mui/icons-material/Download";

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isGrid, setIsGrid] = useState(false);

  const handleClick = () => {
    setIsGrid(!isGrid);
  };

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
    <div>
      <div
        className="App"
        style={{ backgroundColor: "#f1f1f1", padding: "20px" }}
      >
        <div style={{ marginRight: "2rem" }}>
          <input
            type="file"
            id="fileInput"
            multiple
            onChange={handleImageUpload}
          />
          <label htmlFor="fileInput">
            <DriveFolderUploadIcon
              style={{ marginRight: "10px", marginTop: "-10px" }}
              fontSize="small"
            />
            Upload
          </label>
        </div>
        <div onClick={handleClick} style={{ marginRight: "2rem" }}>
          {isGrid ? (
            <GridOnIcon
              onClick={() => setViewMode("grid")}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                marginRight: "50px",
                marginTop: "2rem",
              }}
            />
          ) : (
            <ListIcon
              onClick={() => setViewMode("list")}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "2rem",
              }}
            />
          )}
        </div>

        <div>
          <DeleteForeverIcon
            onClick={() => handleBulkAction("delete")}
            style={{
              backgroundColor: "#4c99af",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              marginRight: "10px",
              marginTop: "2rem",
            }}
          >
            Delete Selected
          </DeleteForeverIcon>
          <DownloadIcon
            onClick={() => handleBulkAction("download")}
            style={{
              backgroundColor: "#4c99af",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "2rem",
            }}
          >
            Download Selected
          </DownloadIcon>
        </div>

        <div style={{ marginTop: "1rem" }}>
          {/* <input type="text" value={searchQuery} onChange={handleSearchQuery} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop:'2rem' }} /> */}
          <TextField
            sx={{
              m: 1,
              width: "25ch",
              "& .MuiInputAdornment-start": { marginTop: 50 },
            }}
            value={searchQuery}
            onChange={handleSearchQuery}
            id="outlined-start-adornment"
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "#4c99af" }} />,
            }}
          />
        </div>
      </div>
      <div>
        {viewMode === "grid" ? (
          <div className="grid-view">
            {filteredImages.map((image) => (
              <div key={image.name} className="image-card">
                <input
                  placeholder="Search.."
                  type="checkbox"
                  checked={selectedImages.includes(image)}
                  onChange={() =>
                    selectedImages.includes(image)
                      ? handleImageDeselect(image)
                      : handleImageSelect(image)
                  }
                />
                <img src={URL.createObjectURL(image)} alt={image.name} />
                <div className="image-name">
                  {image.name.split(".").slice(0, -1).join(".")}
                  <br></br>
                  {image.name.split(".").pop()}
                  {(image.size / 1024 / 1024).toFixed(2)} MB
                </div>
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
                <div className="image-name">
                  {image.name.split(".").slice(0, -1).join(".")}
                  <br></br>
                  {image.name.split(".").pop()}
                  {(image.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
