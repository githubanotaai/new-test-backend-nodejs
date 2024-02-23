import {Request, Response} from "express";
import {CreateCategoryDTO, UpdateCategoryDTO} from "../dtos/categoryDTO";
import categoryService from "../services/categoryService";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: `Internal Server Error - ${error}`});
  }
};

export const getCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {categoryId} = req.params;
    const category = await categoryService.getCategory(categoryId);
    if (!updateCategory) {
      res.status(404).json({error: "Category not found"});
      return;
    }
    res.status(200).json(category);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({error: `Internal Server Error - ${error}`});
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categoryDTO = new CreateCategoryDTO(req.body);

    const savedCategory = await categoryService.createCategory(categoryDTO);

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: `Internal Server Error - ${error}`});
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {categoryId} = req.params;

    if (!req.body) {
      res.status(400).json({error: "Request body is missing"});
      return;
    }

    const categoryDTO = new UpdateCategoryDTO(req.body);

    if (categoryId !== categoryDTO._id) {
      res.status(400).json({
        error: "id doesnt match. ",
        _id: categoryDTO._id,
        categoryId: categoryId,
      });
      return;
    }

    const updatedCategory = await categoryService.updateCategory(
      categoryId,
      categoryDTO
    );

    if (!updateCategory) {
      res.status(404).json({error: "Category not found"});
      return;
    }

    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: `Internal Server Error - ${error}`});
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {categoryId} = req.params;

    await categoryService.deleteCategory(categoryId);

    res
      .status(200)
      .json({success: true, data: "Category deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: `Internal Server Error - ${error}`});
  }
};
