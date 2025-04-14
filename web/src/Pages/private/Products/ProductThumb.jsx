import React from "react";

const ProductThumb = React.memo(
  ({ image, index, mainImageIndex, setMainImageIndex, onClickDeleteImage }) => {
    const imageUrl = React.useMemo(() => URL.createObjectURL(image), [image]);

    return (
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          border: mainImageIndex === index ? `4px solid blue` : ``,
        }}
        className="image-preview"
        onClick={() => setMainImageIndex(index)}
      >
        <div
          className="image-delete"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the onClick for setting main image
            onClickDeleteImage(index);
          }}
        >
          X
        </div>
      </div>
    );
  }
);

export default ProductThumb;
