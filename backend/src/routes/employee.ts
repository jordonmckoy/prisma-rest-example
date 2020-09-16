import express, { Request, Response } from 'express';
import prisma from "../prisma";

const router = express.Router();

/**
 * GET employees - Return list of all employees
 */
router.get("/employees",  async (req: Request, res: Response) => {
  const employees = await prisma.employee.findMany();
  res.json(employees?.map(employee => ({ id: employee?.id, name: employee?.name})));
});

/**
 * GET employee/:id - Return an employee found by ID
 */
// router.get("/employee/:id",  async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const employee = await prisma.employee.findOne({
//     where: {
//       id: Number(id)
//     }
//   });
//   res.json(employee);
// });

/**
 * PUT employees - Update an exisiting employee
 */
router.put("/employee/:id",  async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const employee = await prisma.employee.update({
    where: { id: Number(id) },
    data: {
      name
    }
  });
  res.json({ id: employee?.id, name: employee?.name});
});

/**
 * POST employees - Insert a new employee
 */
router.post("/employee",  async (req: Request, res: Response) => {
  const { ...rest } = req.body;
  const employee = await prisma.employee.create({
    data: {
      ...rest
    }
  });
  res.json({ id: employee?.id, name: employee?.name});
});

export default router;