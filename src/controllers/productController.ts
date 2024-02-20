import {Request, Response} from "express";
import {CreateProductDTO, UpdateProductDTO} from "../dtos/productDTO";
import productService from "../services/productService";
import {CategoryNotFoundError} from "../errors/productError";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: `Internal Server Error - ${error}`});
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {productId} = req.params;
    const product = await productService.getProduct(productId);
    if (!product) {
      res.status(404).json({error: "Product not found"});
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: `Internal Server Error - ${error}`});
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productDTO = new CreateProductDTO(req.body);

    const savedProduct = await productService.createProduct(productDTO);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    if (error instanceof CategoryNotFoundError) {
      res.status(400).json({error: `Bad Request - ${error}`});
      return;
    }
    res.status(500).json({error: `Internal Server Error - ${error}`});
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {productId} = req.params;

    const productDTO = new UpdateProductDTO(req.body);

    if (productId !== productDTO._id) {
      res.status(400).json({
        error: "id doesnt match. ",
        _id: productDTO._id,
        productId: productId,
      });
      return;
    }
    const updatedProduct = await productService.updateProduct(
      productId,
      productDTO
    );

    if (!updateProduct) {
      res.status(404).json({error: "Product not found"});
      return;
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: `Internal Server Error - ${error}`});
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {productId} = req.params;

    const message = await productService.deleteProduct(productId);

    if (!message) {
      res.status(400).json({success: false, error: "Message not found!"});
      return;
    }
    res.status(200).json({success: true, data: message});
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({error: `Internal Server Error - ${error}`});
  }
};
