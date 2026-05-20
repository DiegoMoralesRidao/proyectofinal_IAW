export default function Home() {
  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Diego Morales Ridao</h1>
      <h2 style={{ color: 'var(--accent-primary)' }}>Administrador de Sistemas Informáticos en Red (ASIR)</h2>
      <p style={{ fontSize: '1.2rem', margin: '2rem 0' }}>
        ¡Bienvenido a mi Tienda ONLINE! Este es el proyecto final para IAW.
      </p>
      <div style={{ textAlign: 'left', border: '4px solid var(--border-color)', padding: '1.5rem', background: 'var(--bg-secondary)', boxShadow: '5px 5px 0px var(--shadow-color)' }}>
        <h3>Perfil Profesional</h3>
        <p>
          Estudiante de ASIR apasionado por la administración de sistemas, redes y desarrollo web. 
          Experiencia en despliegues con Docker, Kubernetes, bases de datos y creación de APIs con NestJS, 
          así como interfaces dinámicas con Next.js y React.
        </p>
        <h3 className="mt-4">Tecnologías utilizadas en el proyecto</h3>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {['NestJS', 'Next.js', 'TypeScript', 'TypeORM', 'SQLite', 'JWT'].map(tech => (
            <li key={tech} style={{ background: 'var(--accent-secondary)', color: 'var(--bg-primary)', padding: '0.5rem 1rem', border: '3px solid var(--border-color)', boxShadow: '3px 3px 0px var(--accent-primary)', fontWeight: '900', textTransform: 'uppercase' }}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
