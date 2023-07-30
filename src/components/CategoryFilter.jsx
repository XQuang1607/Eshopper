import React from 'react'

const CategoryFilter = ({ productsOfCategoryShop, checkedCategories, onCategoryChange }) => {
    return (
      <>
        {productsOfCategoryShop.map((cate) => (
          <div
            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            style={{ fontSize: "17px" }}
            key={cate._id}
          >
            <input
              type="checkbox"
              className="custom-control-input"
              checked={checkedCategories[cate._id]}
              onChange={() => onCategoryChange(cate._id)}
              id={`category-${cate._id}`}
            />
            <label
              className="custom-control-label"
              htmlFor={`category-${cate._id}`}
            >
              {cate.name}
            </label>
            <span className="badge font-weight-normal">
              {cate.totalProduct}
            </span>
          </div>
        ))}
      </>
    );
  };
  
  export default CategoryFilter;