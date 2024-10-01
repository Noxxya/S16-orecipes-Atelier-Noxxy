import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './recette-content.css';
import ScrollToTop from '../ScrollToTop/ScrollToTop'

export default function RecipeDetail() {
  // Récupère l'ID de la recette depuis l'URL
  const { id } = useParams();
  
  // États pour gérer les données de la recette, le chargement et les erreurs
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effet pour charger les détails de la recette
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Appel à l'API pour récupérer les détails de la recette
        const response = await fetch(`https://orecipesapi.onrender.com/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la recette");
        }

        const data = await response.json();
        setRecipe(data); // Mise à jour de l'état avec les données de la recette
      } catch (error) {
        setError(error.message); // Gestion des erreurs
      } finally {
        setLoading(false); // Fin du chargement, qu'il y ait une erreur ou non
      }
    };

    fetchRecipe(); // Appel de la fonction de fetch
  }, [id]); // L'effet se déclenche à chaque changement de l'ID

  // Affichage pendant le chargement
  if (loading) {
    return <p>Chargement des détails de la recette...</p>;
  }

  // Affichage en cas d'erreur
  if (error) {
    return <p>Erreur : {error}</p>;
  }

  // Si la recette n'est pas trouvée
  if (!recipe) {
    return <p>Recette non trouvée</p>;
  }

  // Rendu des détails de la recette
  return (
    <div className="recipe-detail">
      <ScrollToTop />
      
      <div className="recipe-header">
        <div className="recipe-info">
          <h2>{recipe.title}</h2>
          <p>Par {recipe.author}</p>
        </div>
        <img src={recipe.thumbnail} alt={recipe.title} className="img-fluid recipe-image" />
      </div>
  
      <div className="recipe-body">
        <p className="recipe-description">{recipe.description}</p>
        <p className="recipe-difficulty">Difficulté : {recipe.difficulty}</p>
  
        <h3>Ingrédients :</h3>
        <ul className="ingredients-list">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
  
        <h3>Instructions :</h3>
        <ol className="instructions-list">
          {recipe.instructions.map((instruction) => (
            <li key={`${recipe.id}-${instruction.slice(0, 20)}`}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}