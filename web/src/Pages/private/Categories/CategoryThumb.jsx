import React from "react";

const CategoryThumb = React.memo(({ name, image, onClickDeleteImage }) => {
  const imageUrl = React.useMemo(() => URL.createObjectURL(image), [image]);

  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className="image-preview"
    >
      <div
        className="image-delete"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the onClick for setting main image
          onClickDeleteImage(name);
        }}
      >
        X
      </div>
    </div>
  );
});

export default CategoryThumb;
