"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function GestionProductos() {
  const [productos, setProductos] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
    else fetchProductos();
  }, [user]);

  const fetchProductos = async () => {
    const res = await fetch('http://localhost:3001/products');
    if (res.ok) setProductos(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = { name, description, price: parseFloat(price), imageUrl };
    
    const url = editingId ? `http://localhost:3001/products/${editingId}` : 'http://localhost:3001/products';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(productData)
    });
    
    setName(''); setDescription(''); setPrice(''); setImageUrl(''); setEditingId(null);
    fetchProductos();
  };

  const handleEdit = (prod: any) => {
    setEditingId(prod.id);
    setName(prod.name);
    setDescription(prod.description);
    setPrice(prod.price.toString());
    setImageUrl(prod.imageUrl || '');
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchProductos();
  };

  if (!user) return null;

  return (
    <div>
      <h2 className="mb-4">Gestión de Productos</h2>
      
      <div className="card mb-4">
        <h3>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          <div className="flex gap-4">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Precio</label>
              <input type="number" step="0.01" className="form-control" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>
            <div className="form-group" style={{ flex: 2 }}>
              <label className="form-label">URL Imagen (Opcional)</label>
              <input type="text" className="form-control" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="btn btn-primary">{editingId ? 'Actualizar' : 'Crear'}</button>
            {editingId && <button type="button" className="btn btn-danger" onClick={() => { setEditingId(null); setName(''); setDescription(''); setPrice(''); setImageUrl(''); }}>Cancelar</button>}
          </div>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(prod => (
              <tr key={prod.id}>
                <td>{prod.name}</td>
                <td>${prod.price}</td>
                <td className="flex gap-4">
                  <button className="btn btn-primary" onClick={() => handleEdit(prod)} style={{ padding: '0.25rem 0.75rem' }}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(prod.id)} style={{ padding: '0.25rem 0.75rem' }}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
