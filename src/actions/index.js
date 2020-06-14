export const recipeAddAction = data => {
  return {
    type: 'ADD_RECIPE',
    data
  };
};

export const recipeUpdateAction = data => {
  return {
    type: 'UPDATE_RECIPE',
    data
  };
};

export const recipeDeleteAction = id => {
  return {
    type: 'DELETE_RECIPE',
    id
  };
};
