import { useEffect, useState } from "react";

const API_BASE = process.env.API_BASE || 'http://localhost:8080/api/products';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await fetch(API_BASE);
    setProducts(await res.json());
  };

  const submit = async () => {
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock)
      })
    });

    resetForm();
    loadProducts();
  };

  const edit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: p.price,
      stock: p.stock
    });
  };

  const remove = async (id) => {
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    loadProducts();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", price: "", stock: "" });
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Products</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />
      <input
        placeholder="Stock"
        type="number"
        value={form.stock}
        onChange={e => setForm({ ...form, stock: e.target.value })}
      />

      <button onClick={submit}>
        {editingId ? "Update" : "Add"}
      </button>
      {editingId && <button onClick={resetForm}>Cancel</button>}

      <table border="1" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => edit(p)}>Edit</button>
                <button onClick={() => remove(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
