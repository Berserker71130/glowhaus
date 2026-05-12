import { products } from "@/lib/dummy-data";

export default function AuditPage() {
  return (
    <div style={{ padding: "20px", background: "#fff" }}>
      <h1>Product Image Audit</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={product.images[0] || "/placeholder.png"}
              alt={product.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                backgroundColor: "#f0f0f0",
              }}
            />
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              {product.name}
            </p>
            <p style={{ fontSize: "12px", color: "#666" }}>ID: {product.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
