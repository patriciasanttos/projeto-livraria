import React from "react";

const ProductThumb = React.memo(
  ({ image, index, mainImageIndex, setMainImageIndex, onClickDeleteImage }) => {
    const imageUrl = React.useMemo(() => {
      if (image instanceof File) {
        return URL.createObjectURL(image);
      }

      return image?.url || "";
    }, [image]);

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
            e.stopPropagation();
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
