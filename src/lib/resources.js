import { deleteCategory } from "@/store/CategorySlice";
import { deleteUser } from "@/store/UserSlice";

export const resources = {
  categories: {
    headers: ["name arabic", "name english"],
    fields: ["name.ar", "name.en"],
    remove: deleteCategory,
  },
  users: {
    headers: ["name", "email", "phone"],
    fields: ["name", "email", "mobile_number"],
    remove: deleteUser,
  },
  campanies: {
    headers: ["name", "email", "phone", "address"],
    fields: ["name", "email", "mobile_number", "address"],
    remove: deleteUser,
  },
  messages: {
    headers: ["title", "content"],
    fields: ["title", "content"],
  },
  ads: {
    headers: ["content", "company"],
    fields: ["content", "user.name"],
  },
};
