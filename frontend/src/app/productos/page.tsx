"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async (searchQuery = '') => {
    const url = searchQuery ? `http://localhost:3001/products?query=${searchQuery}` : 'http://localhost:3001/products';
    const res = await fetch(url);
    if (res.ok) {
      setProductos(await res.json());
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProductos(query);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Catálogo de Productos</h2>
        <form onSubmit={handleSearch} className="flex gap-4">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar productos..." 
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ width: '250px' }}
          />
          <button type="submit" className="btn btn-primary">Buscar</button>
        </form>
      </div>

      <div className="grid">
        {productos.map((prod: any) => (
          <div key={prod.id} className="card">
            {prod.imageUrl && <img src={prod.imageUrl} alt={prod.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem' }} />}
            <h3>{prod.name}</h3>
            <p style={{ fontWeight: 'bold', color: 'var(--success)' }}>${prod.price}</p>
            <Link href={`/productos/${prod.id}`} className="btn btn-primary mt-4" style={{ width: '100%' }}>Ver Detalle</Link>
          </div>
        ))}
      </div>
      {productos.length === 0 && <p className="text-center mt-4">No se encontraron productos.</p>}
    </div>
  );
}
