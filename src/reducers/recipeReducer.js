const initialState = {
  recipe: [
    {
      id: 1,
      name: 'Chocolate Cake',
      type: 'Dessert',
      time: '2',
      ingredient:
        '2 cups all-purpose flour\n2 cups granulated sugar\n3/4 cup Dutch-processed cocoa powder sifted\n2 tsp baking soda\n1 tsp baking powder\n1 tsp salt\n1/2 cup vegetable oil\n1 cup buttermilk room temperature\n1 cup hot water\n2 large eggs room temperature\n2 tsp vanilla',
      step:
        '1. Preheat oven to 350F, grease two 8" round baking pans and dust with cocoa powder. Line bottoms with parchment.\n2. Place all dry ingredients into the bowl of a stand mixer fitted with a paddle attachment. Stir to combine.\n3. In a medium bowl whisk all wet ingredients (pour hot water in slowly as not to cook the eggs).\n4. Add wet ingredients to dry and mix on medium for 2-3 mins. Batter will be very thin.\n5. Pour evenly into prepared pans. I used a kitchen scale to ensure the batter is evenly distributed.\n6. Bake for 45 mins or until a cake tester comes out mostly clean.\n7. Cool 10 minutes in the pans then turn out onto a wire rack to cool completely.'
    }
  ]
};

const recipeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return {
        ...state,
        recipe: [
          ...state.recipe,
          { id: state.recipe.length + 1, ...action.data }
        ]
      };

    case 'UPDATE_RECIPE':
      const selectedRecipe = state.recipe.find(
        item => item.id === action.data.id
      );

      if (selectedRecipe) {
        selectedRecipe.name = action.data.name;
        selectedRecipe.type = action.data.type;
        selectedRecipe.image = action.data.image;
        selectedRecipe.time = action.data.time;
        selectedRecipe.ingredient = action.data.ingredient;
        selectedRecipe.step = action.data.step;
      }

      console.log('//reducer', selectedRecipe, state);
      return { ...state };

    case 'DELETE_RECIPE':
      const selectedIndex = state.recipe.findIndex(
        item => item.id === action.id
      );

      if (selectedIndex !== -1) {
        state.recipe.splice(selectedIndex, 1);
      }

      return { ...state, recipe: [...state.recipe] };

    default:
      return state;
  }
};

export default recipeReducer;
