import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Categories = ({ productsOfCateogory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    router.push(`/shop?category=${categoryId}`);
  };
  return (
    <div>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          {productsOfCateogory.map((cate) => (
            <div className="col-lg-4 col-md-6 pb-1" key={cate._id}>
              <Link  
                // key={cate._id}
                href={`/shop`}
              >
                <div
                  className="cat-item d-flex flex-column border mb-4"
                  style={{ padding: 30 }}
                  onClick={() => handleCategoryClick(cate._id)}
                >
                  <p className="text-right">{cate.totalProduct} products</p>
                  <div
                    className="cat-img position-relative overflow-hidden mb-3"
                  >
                    <img className="img-fluid" src={cate.cover} width={383} alt="" />
                  </div>
                  <h5 className="font-weight-semi-bold m-0">{cate.name}</h5>
                </div>
            </Link>
              </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Categories;
