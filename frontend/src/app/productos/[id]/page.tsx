"use client";
import { useEffect, useState, use } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProductoDetalle({ params }: { params: Promise<{ id: string }> }) {
  const [producto, setProducto] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { user, token } = useAuth();
  const router = useRouter();
  
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchProducto = async () => {
      const res = await fetch(`http://localhost:3001/products/${resolvedParams.id}`);
      if (res.ok) setProducto(await res.json());
    };
    fetchProducto();
  }, [resolvedParams.id]);

  const addToCart = async () => {
    if (!user || !token) return;
    const res = await fetch('http://localhost:3001/cart', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId: producto.id, quantity }),
    });
    if (res.ok) {
      alert('Producto añadido al carrito');
      router.push('/carrito');
    }
  };

  if (!producto) return <p className="text-center">Cargando...</p>;

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
        {producto.imageUrl && (
          <div style={{ flex: '1 1 300px' }}>
            <img src={producto.imageUrl} alt={producto.name} style={{ width: '100%', borderRadius: '0.5rem' }} />
          </div>
        )}
        <div style={{ flex: '1 1 300px' }}>
          <h2>{producto.name}</h2>
          <h3 style={{ color: 'var(--success)', marginTop: '1rem' }}>${producto.price}</h3>
          <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>{producto.description}</p>
          
          {user ? (
            <div className="mt-4 flex gap-4 items-center">
              <input 
                type="number" 
                className="form-control" 
                value={quantity} 
                min="1" 
                onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                style={{ width: '80px' }}
              />
              <button onClick={addToCart} className="btn btn-primary">Añadir al Carrito</button>
            </div>
          ) : (
            <p className="mt-4 text-center" style={{ color: 'var(--bg-primary)', padding: '1rem', border: '3px solid var(--border-color)', background: 'var(--accent-secondary)', fontWeight: '900', boxShadow: '4px 4px 0px var(--accent-primary)', textTransform: 'uppercase' }}>
              Inicia sesión para añadir productos al carrito.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
