"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Carrito() {
  const [items, setItems] = useState<any[]>([]);
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
    else fetchCart();
  }, [user]);

  const fetchCart = async () => {
    const res = await fetch('http://localhost:3001/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) setItems(await res.json());
  };

  const handleUpdate = async (id: number, quantity: number) => {
    await fetch(`http://localhost:3001/cart/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ quantity })
    });
    fetchCart();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/cart/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchCart();
  };

  const handleCheckout = async () => {
    const res = await fetch('http://localhost:3001/cart/checkout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      alert('Pago realizado con éxito');
      setItems([]);
    }
  };

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (!user) return null;

  return (
    <div>
      <h2 className="mb-4">Tu Carrito</h2>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td>${item.product.price}</td>
                    <td>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        min="1" 
                        onChange={(e) => handleUpdate(item.id, parseInt(e.target.value) || 1)}
                        className="form-control"
                        style={{ width: '80px', padding: '0.25rem 0.5rem' }}
                      />
                    </td>
                    <td>${item.product.price * item.quantity}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <h3 style={{ margin: 0 }}>Total a Pagar: ${subtotal}</h3>
            <button className="btn btn-primary" onClick={handleCheckout}>Pagar Ahora</button>
          </div>
        </div>
      )}
    </div>
  );
}
