import { Router } from "express";

const router = Router()

router.post('/users');
router.get('/users');
router.get('/users:id');
router.put('/users');
router.delete('/users:id');

export default router;