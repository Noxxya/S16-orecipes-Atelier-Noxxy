import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar({ recipes }) {
  return (
    <div className="d-flex flex-column p-3 bg-dark" style={{ width: '250px', height: '100vh', position: 'fixed', top: '0', left: '0' }}>

      <Link className="text-light pb-3" to={`/`} >
        Accueil
      </Link>

      <div className="list-group list-group-flush">
        {recipes.map((recette) => (


          // <Link className="list-group-item list-group-item-action bg-dark text-light" to={`/recipe/${recette.id}`} key={recette.id} >
          //   {recette.title}
          // </Link>

          <NavLink
            key={recette.id}
            to={`/recipe/${recette.id}`}
            className={({ isActive }) =>
              isActive
                ? "d-none"  // Cache le lien si actif
                : "list-group-item list-group-item-action bg-dark text-light"
            }
          >
            {recette.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}




