'use strict';

var app = app || {};

(function (module) {
  const recipeViewer = {};

  recipeViewer.showRandomRecipe = () => {
    app.recipe.getRandom();
    console.log('got random recipe, need to put it in the DOM');
  }

  recipeViewer.renderRecipeCard = Handlebars.compile($('#recipe-card-template').text());
  
  recipeViewer.populateRecipeCards = function () {
    $('#card-container').append(app.recipe.queriedRecipes.map(app.recipeViewer.renderRecipeCard));
    app.recipeController.recipeDetailListener();
  }

  recipeViewer.renderDetailedRecipe = function(data) {
    var template = Handlebars.compile($('#recipe-detail-template').text());
    return template(data);
  };

  recipeViewer.renderRecipeIngredients = function(data) {
    var ingredientsTemplate = Handlebars.compile($('#recipe-ingredients-template').text());
    return ingredientsTemplate(data);
  }

  recipeViewer.populateDetailedRecipe = function (data) {
    console.log('recipeViewer.populateDetailedRecipe was called ', data);
    $('#recipe-container').append(app.recipeViewer.renderDetailedRecipe(data));
    // $('#recipe-container').append(app.recipeViewer.renderRecipeIngredients(data.Ingredients));
    $('#recipe-container table').append(data.Ingredients.map( ingredient => app.recipeViewer.renderRecipeIngredients(ingredient) ))
    $('#card-container').hide();
    $('#recipe-container').show();
  }

  module.recipeViewer = recipeViewer;
}(app));