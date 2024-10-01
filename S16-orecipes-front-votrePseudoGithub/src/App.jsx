import { useState, useEffect } from 'react'
import './App.css'
import HomePage from './homepage/homepage'


export default function App() {
  
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
      <>
        <HomePage recipes={recipe}/>
      </>
    )
  }

