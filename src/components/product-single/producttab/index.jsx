"use client";

import { useState } from "react";
import FinalBossUI from "../../../components/product-single/description";
// import Reviews from "../../../components/product-single/reviews";

const ProductTabs = ({ product }) => {
  const [showBlock, setShowBlock] = useState("description");

  return (
    <div className="product-single__info">
      <div className="product-single__info-btns">
        <button
          type="button"
          onClick={() => setShowBlock("description")}
          className={`btn btn--rounded ${
            showBlock === "description" ? "btn--active" : ""
          }`}
        >
          Description
        </button>

        {/* <button
          type="button"
          onClick={() => setShowBlock("reviews")}
          className={`btn btn--rounded ${
            showBlock === "reviews" ? "btn--active" : ""
          }`}
        >
          Reviews (2)
        </button> */}
      </div>
<FinalBossUI product={product} show={showBlock === "description"} />
      {/* <Description  product={product} show={showBlock === "description"} /> */}
      {/* <Reviews product={product} show={showBlock === "reviews"} /> */}
    </div>
  );
};

export default ProductTabs;