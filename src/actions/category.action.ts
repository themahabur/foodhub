"use server";
import { categoryService } from "@/services/category.service";

export const getCategory = async () => {
  const data = await categoryService.getCategory();
  return data;
};
