import React from "react";

const CategoryThumb = React.memo(({ name, image, onClickDeleteImage }) => {
  const imageUrl = React.useMemo(() => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }

    return image || "";
  }, [image]);

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
          e.stopPropagation();
          onClickDeleteImage(name);
        }}
      >
        X
      </div>
    </div>
  );
});

export default CategoryThumb;
