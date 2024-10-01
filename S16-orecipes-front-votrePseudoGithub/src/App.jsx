import { useState, useEffect } from 'react'
import './App.css'
import HomePage from './homepage/homepage';
import Navbar from './nav-bar/nav-bar';
import RecipeDetail from './recette-content/recipeDetail';

export default function App() {
  // Initialisation du state 'recipe' avec un tableau contenant une recette par défaut
  // Cela permet d'avoir des données à afficher même avant le chargement depuis l'API
  const [recipe, setRecipe] = useState([
    {
      id: 12345,
      title: "Cookie",
      thumbnail: "https://www.sunny-delices.fr/wp-content/uploads/2022/09/cookies-beurre-cacahouettes-sans-gluten-680x451.jpg",
      difficulty: "facile",
      descritpion: "Pour 10 cookies"
    }
  ]);

  // State pour gérer l'état de chargement
  const [loading, setLoading] = useState(true);
  // State pour gérer les erreurs potentielles
  const [error, setError] = useState(null);

  // useEffect pour charger les données au montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les recettes
    const fetchRecipes = async () => {
      try {
        // Appel à l'API
        const response = await fetch("https://orecipesapi.onrender.com/api/recipes");

        // Vérification de la réponse
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        // Conversion de la réponse en JSON
        const data = await response.json();

        // Mise à jour du state avec les nouvelles recettes
        setRecipe(data);
      } catch (error) {
        // En cas d'erreur, on la log et on met à jour le state d'erreur
        console.error("Erreur lors de la récupération des recettes:", error);
        setError(error.message);
      } finally {
        // Qu'il y ait une erreur ou non, on indique que le chargement est terminé
        setLoading(false);
      }
    };

    // Appel de la fonction de fetch
    fetchRecipes();
  }, []); // Dépendances vides : l'effet ne s'exécute qu'au montage

  // Affichage d'un message de chargement si les données sont en cours de récupération
  if (loading) {
    return <p>Chargement des recettes...</p>
  }

  // Affichage d'un message d'erreur si quelque chose s'est mal passé
  if (error) {
    return <p>Erreur: {error}</p>;
  }

  // Rendu principal : on passe les recettes au composant HomePage
  // HomePage va gérer l'affichage des recettes avec un .map()
  return (
    <div className="app-container">
      {/* Barre de navigation latérale */}
      <Navbar recipes={recipe} />

      {/* Contenu principal avec un décalage pour éviter le chevauchement */}
      <div className="content" style={{ marginLeft: '250px', padding: '20px' }}>
        <HomePage recipes={recipe} />
      </div>
    </div>
  );
}