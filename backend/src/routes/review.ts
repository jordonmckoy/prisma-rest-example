import express, { Request, Response } from 'express';
import prisma from "../prisma";

const router = express.Router();

/**
 * GET review - Return all the reviews for a specified employee or reviewer
 */
router.get("/review", async (req: Request, res: Response) => {
  // Return empty array of there is no specified employee or reviewer
  if (!req.query.employee && !req.query.reviewer) {
    res.json([]);
  }

  let reviews;

  if (req.query.employee) {
    reviews = await prisma.review.findMany({
      where: {
        employeeId: parseInt(req.query.employee as string)
      }
    });
  } else {
    reviews = await prisma.review.findMany({
      where: {
        reviewerId: parseInt(req.query.reviewer as string)
      }
    });
  }

  res.json(reviews);
});

/**
 * GET review/:id - Return a review found by ID
 */
router.get("/review/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const review = await prisma.review.findOne({
    where: {
      id: Number(id)
    }
  });
  res.json(review);
});

/**
 * GET review/:id - Return a review found by ID
 */
router.get("/review/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const review = await prisma.review.findOne({
    where: {
      id: Number(id)
    }
  });
  res.json(review);
});

export default router;