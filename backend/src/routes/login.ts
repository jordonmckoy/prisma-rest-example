import express, { Request, Response } from 'express';
import prisma from "../prisma";

const router = express.Router();

/**
 * GET login - Checks if an admin or employee exists with the matching username and password
 */
router.get("/login",  async (req: Request, res: Response) => {
  const { username, password } = req.query;
  const admin = await prisma.admin.findOne({
    where: {
      username: username as string,
    }
  });
  const employee = await prisma.employee.findOne({
    where: {
      username: username as string,
    }
  });

  if (admin?.password === password) {
    res.json({ data: {
      role: admin?.role,
    userId: admin?.id }});
    return;
  }
  
  if (employee?.password === password) {
    res.json({ data: { role: employee?.role, userId: employee?.id } });
    return;
  }

  res.json({ data: undefined });
  return;
});

export default router;