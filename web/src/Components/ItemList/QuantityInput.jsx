import { useRef,useEffect } from "react";

const QuantityInput = ({
  quantity,
  index,
  onClickLess,
  onClickMore,
  onChangeQuantity,
  lastUpdatedIndex
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if(lastUpdatedIndex === index) {
        console.log('>>> index', index)
        inputRef.current.focus()
    }
    
  }, [lastUpdatedIndex, index, inputRef]);

  return (
    <div className="td-quantify">
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
    </div>
  );
};

export default QuantityInput;
