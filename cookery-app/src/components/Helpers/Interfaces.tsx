export interface User {
  user_id: number;
  user_name: string;
  user_surname: string;
  user_email: string;
  user_password: string;
}

export interface Recipe {
  recipe_id: number;
  title: string;
  description: string;
  ingredients: string;
  cooking_time: string;
  author: string;
  user_id: number;
}
