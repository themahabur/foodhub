import { env } from "@/env";

const getCategory = async () => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
  );
  const category = await response.json();
  return category;
};

export const categoryService = {
  getCategory,
};
