import "./ImageUpload.css";

function ImageUpload({ preview, onChange }) {
  return (
    <div className="upload-box">

      {preview ? (
        <img src={preview} alt="Preview" />
      ) : (
        <p>Click to Upload Banner</p>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={onChange}
      />

    </div>
  );
}

export default ImageUpload;