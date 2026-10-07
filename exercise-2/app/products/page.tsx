type Product = {
  id: number;
  title: string;
};

type ProductsResponse = {
  products: Product[];
};

export default async function ProductsPage() {
  const response = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await response.json();

  return (
    <main>
      <h1>Products</h1>

      <ul>
        {data.products.slice(0, 5).map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </main>
  );
}