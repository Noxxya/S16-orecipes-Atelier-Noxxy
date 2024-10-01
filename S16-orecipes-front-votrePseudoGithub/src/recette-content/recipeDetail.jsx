import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetail() {
  const { id } = useParams(); // Récupère l'ID de l'URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch des détails d'une recette spécifique avec l'ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://orecipesapi.onrender.com/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la recette");
        }

        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <p>Chargement des détails de la recette...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!recipe) {
    return <p>Recette non trouvée</p>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>Par {recipe.author}</p>
      <img src={recipe.thumbnail} alt={recipe.title} className="img-fluid" />
      <p>{recipe.description}</p>
      <p>Difficulté : {recipe.difficulty}</p>
      <h3>Ingrédients :</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>

      <h3>Instructions :</h3>
      <ol>
        {recipe.instructions.map((step) => (
          <li>{step}</li>
        ))}
      </ol>
    </div>
  );
}
