import { useState } from 'react';


export default function LoginNavbar() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Nom d\'utilisateur:', username);
    console.log('Mot de passe:', password);

    // Post sur l'API
    try{
      const response = await  fetch('https://orecipesapi.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password: password,
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('connexion réussie', data);
        setSuccess(true);
        setError(null);
      } else {
        setError(data.message || 'Erreur de connexion');
        setSuccess(false);
      }

    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
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

