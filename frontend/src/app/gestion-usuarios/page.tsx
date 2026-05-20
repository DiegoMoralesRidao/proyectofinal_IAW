"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.perfil !== 'admin') {
      router.push('/');
    } else {
      fetchUsuarios();
    }
  }, [user]);

  const fetchUsuarios = async () => {
    const res = await fetch('http://localhost:3001/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) setUsuarios(await res.json());
  };

  const handleChangeRole = async (id: number, perfil: string) => {
    await fetch(`http://localhost:3001/users/${id}/perfil`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ perfil })
    });
    fetchUsuarios();
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Seguro que quieres borrar este usuario?')) {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsuarios();
    }
  };

  if (!user || user.perfil !== 'admin') return null;

  return (
    <div>
      <h2 className="mb-4">Gestión de Usuarios</h2>
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Perfil</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>
                    <select 
                      value={u.perfil} 
                      onChange={(e) => handleChangeRole(u.id, e.target.value)}
                      className="form-control"
                      style={{ padding: '0.25rem 0.5rem', width: 'auto' }}
                      disabled={u.id === user.id}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleDelete(u.id)}
                      disabled={u.id === user.id}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
