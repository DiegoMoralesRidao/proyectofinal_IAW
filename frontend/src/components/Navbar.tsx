"use client";
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link href="/" className="logo">Tienda ONLINE</Link>
      <div className="nav-links">
        <Link href="/" className="nav-link">Inicio</Link>
        <Link href="/productos" className="nav-link">Productos</Link>
        {user ? (
          <>
            <Link href="/carrito" className="nav-link">Carrito</Link>
            <Link href="/gestion-productos" className="nav-link">Gestionar Productos</Link>
            {user.perfil === 'admin' && (
              <Link href="/gestion-usuarios" className="nav-link">Usuarios</Link>
            )}
            <button onClick={logout} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>Salir ({user.username})</button>
          </>
        ) : (
          <>
            <Link href="/login" className="nav-link">Login</Link>
            <Link href="/registro" className="nav-link btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}
