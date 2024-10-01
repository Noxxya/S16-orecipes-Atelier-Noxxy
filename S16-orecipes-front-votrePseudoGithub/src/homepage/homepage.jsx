export default function HomePage({ recipes }) {
  return (
    <div>
      <h1 className="mb-4">Liste des Recettes</h1>
      <div className="row">
        {recipes.map((recette) => (
          <div id={`recette-${recette.id}`} className="col-sm-12 col-md-6 col-lg-4 mb-4" key={recette.id}>
            <div className="card h-100">
              <img
                src={recette.thumbnail}
                className="card-img-top"
                alt={recette.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recette.title}</h5>
                <p className="card-text">Difficulté : {recette.difficulty}</p>
                <p className="card-text">{recette.description}</p>
                <a href={recette.id} className="btn btn-primary mt-auto">
                  Voir la recette
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}