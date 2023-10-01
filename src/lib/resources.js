export const resources = {
  products: {
    headers: ["name", "price", "qty", "image", "category", "restaurant"],
    fields: [
      "name",
      "price",
      "qty",
      "image",
      "category.name",
      "restaurant.name",
    ],
  },
};
