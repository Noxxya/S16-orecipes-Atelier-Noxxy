import { useState } from 'react';

export default function LoginNavbar() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Nom d\'utilisateur:', username);
    console.log('Mot de passe:', password);
    // TODO: Ajouter la logique de connexion ici
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ marginLeft: '250px' }}> {/* Utilisation de margin-left pour éviter l'overlap */}
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Login</a>

        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control me-2"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">Se connecter</button>
        </form>
      </div>
    </nav>
  );
}

