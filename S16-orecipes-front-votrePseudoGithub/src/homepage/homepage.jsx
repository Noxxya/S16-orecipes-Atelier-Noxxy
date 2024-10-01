import { useState, useEffect } from "react";

export default function ListRecettes() {
  // Initialisation du state 'recipe' avec useState
  // Le state initial est un tableau contenant un objet recette par défaut
  const [recipe, setRecipe] = useState([
    {
      id: 12345,
      title: "Cookie",
      thumbnail: "https://www.sunny-delices.fr/wp-content/uploads/2022/09/cookies-beurre-cacahouettes-sans-gluten-680x451.jpg",
      difficulty: "facile",
      descritpion: "Pour 10 cookies"
    }
  ]);

  const [loading, setLoading] = useState(true); // State pour gérer le chargement
  const [error, setError] = useState(null); // State pour gérer les erreurs

  // Utilisation de useEffect pour effectuer des actions après le rendu du composant
  // Ce hook permet d'exécuter des effets de bord dans les composants fonctionnels
  useEffect(() => {
    // Définition d'une fonction asynchrone pour récupérer les recettes
    // Cette fonction est déclarée à l'intérieur de useEffect pour éviter les warnings liés aux dépendances
    const fetchRecipes = async () => {
      try {
        // Envoi d'une requête GET à l'API pour récupérer les recettes
        const response = await fetch("https://orecipesapi.onrender.com/api/recipes");

        // Vérification que la réponse est ok (statut 200-299)
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        // Conversion de la réponse en JSON
        const data = await response.json();

        // Mise à jour du state 'recipe' avec les données récupérées
        setRecipe(data);
      } catch (error) {
        // Gestion des erreurs (à implémenter selon vos besoins)
        console.error("Erreur lors de la récupération des recettes:", error);
      } finally {
        setLoading(false);
      }
    };

    // Appel de la fonction fetchRecipes
    fetchRecipes();
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécutera qu'une fois, au montage du composant

  // Note: Il manque encore le return pour afficher les recettes dans le composant
  if (loading) {
    return <p>Chargement des recettes...</p>
  }

  if (error) {
    return <p>Erreur: {error}</p>;
  }

  return (
    <div>
      <h1>Liste des Recettes</h1>

      <div className="row">
        {recipe.map((recette) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={recette.id}>
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
                <a href="#" className="btn btn-primary mt-auto">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}