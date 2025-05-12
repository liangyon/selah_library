import { Router } from 'express';
import { register, login , refreshToken, logout} from '../controllers/authController';
import { check } from 'express-validator';

const router = Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  register
);

router.post(
  '/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  login
);

router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
