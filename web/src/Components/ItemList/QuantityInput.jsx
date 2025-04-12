import { useRef, useEffect } from "react";

const QuantityInput = ({
  quantity,
  index,
  onClickLess,
  onClickMore,
  onChangeQuantity,
  lastUpdatedIndex,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (lastUpdatedIndex === index) {
      inputRef.current.focus();
    }
  }, [lastUpdatedIndex, index, inputRef]);

  return (
    <section className="td-quantify">
      <div className="btn-quantify less" onClick={() => onClickLess(index)}>
        -
      </div>
      <input
        type="number"
        value={quantity}
        onChange={(e) => onChangeQuantity(index, e)}
        ref={inputRef}
      />
      <div className="btn-quantify more" onClick={() => onClickMore(index)}>
        +
      </div>
    </section>
  );
};

export default QuantityInput;
