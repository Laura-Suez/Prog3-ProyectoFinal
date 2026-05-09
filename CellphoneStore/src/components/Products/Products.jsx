import ProductCard from "../ProductCard/ProductCard";

function Products({ productList }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Productos</h2>

      <div className="row g-4">
        {productList.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;