import React from 'react';

export default function Navbar({ recipes }) {
  return (
    <div className="d-flex flex-column p-3 bg-dark" style={{ width: '250px', height: '100vh', position: 'fixed', top: '0', left: '0' }}>
      <h4 className="text-light pb-3">Accueil</h4>
      <div className="list-group list-group-flush">
        {recipes.map((recette) => (
          <a 
            href={`${recette.id}`} 
            className="list-group-item list-group-item-action bg-dark text-light"
            key={recette.id}
          >
            {recette.title}
          </a>
        ))}
      </div>
    </div>
  );
}

