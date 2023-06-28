import { User, UserStatus } from '@prisma/client';
import { Router } from 'express';
import { validateRegisterUser } from '@shared/validation';
import { mdUserAdd, mdUserFindEmail } from '@shared/models';
import { compareHashPassword, hashPassword } from '../../lib/password';
import { generateRefreshToken, generateToken } from '../../lib/jwt';

const router = Router();

router.post('/auth/sign-in', async (req, res) => {
	try {
		const body = req.body as Pick<User, 'email' | 'password'>;
		console.log(body);
		const user = await mdUserFindEmail(body.email);

		if (!user) {
			return res.json({ status: 400, error: 'Your credential is invalid' });
		}

		const result = compareHashPassword(body.password, user.password);
		if (!result) {
			return res.json({ status: 400, error: 'Your email or password is invalid' })
		}

		const token = generateToken({
      id: user.id,
			email: user.email,
			name: user.name,
			photo: user.photo
		})

		const refreshToken = generateRefreshToken({
			email: user.email
		})

    console.log(token)
    console.log(refreshToken)

		res.setHeader('Authorization', token)
		res.setHeader('RefreshToken', refreshToken)

		res.json({ status: 200 });
	} catch (error) {
    console.log(error)
		res.json({ status: 500, error });
	}
});

router.post('/auth/sign-up', async (req, res) => {
	try {
		const body = req.body as User;
		const { error, errorArr, data } = validateRegisterUser(body);

		if (error && errorArr) {
			return res.json({ status: 404, error: errorArr });
		}

		const resultData = data as User;
		const hashedPwd = hashPassword(resultData.password);

		const user = await mdUserAdd({
			email: resultData.email,
			password: hashedPwd,
			name: resultData.name,
			country: null,
			bio: null,
			dob: null,
			status: UserStatus.ACTIVE,
			photo: null,

			createdAt: new Date(),
			createdBy: null,
			updatedAt: null,
			updatedBy: null
		});

		res.json({
			status: 200,
			data: user
		});
	} catch (error) {
		res.json({
			status: 500,
			error
		});
	}
});

export default router;
