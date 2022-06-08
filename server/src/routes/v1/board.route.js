import express from "express";
import { BoardController } from "../../controllers/board.controller";
import { BoardValidation } from "../../validation/board.validation";

const router = express.Router();

router
  .route("/")
  //   .get((req, res) => console.log("GET boards"))
  .post(BoardValidation.createNew, BoardController.createNew);

router
  .route('/:id')
  .get(BoardController.getFullBoard)
  .put(BoardValidation.update, BoardController.update);

export const boardRoutes = router