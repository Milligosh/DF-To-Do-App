import express from 'express'
import { UserControllers } from '../controllers/users'
import { validateSignUpApplicantInput } from '../middlewares/validation'

const router = express.Router()

/**
 * @swagger
 * /users/newUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: First name of the user (must be a non-empty string)
 *               lastname:
 *                 type: string
 *                 description: Last name of the user (must be a non-empty string)
 *               username:
 *                 type: string
 *                 description: Unique username for the user (must be a non-empty string)
 *               email:
 *                 type: string
 *                 description: Valid email address (must contain '@')
 *               password:
 *                 type: string
 *                 description: Password (must be at least 8 characters long)
 *               phonenumber:
 *                 type: string
 *                 description: Phone number (must be a valid number with at least 10 digits)
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: User already exists
 */
router.post('/newUser', validateSignUpApplicantInput, UserControllers.createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: User login successfully
 *       409:
 *         description: User does not exist or wrong credentials
 */
router.post('/login', UserControllers.loginUser);
export default router