import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

const salt = genSaltSync(10);

export const hashPassword = (pwd: string) => {
	return hashSync(pwd, salt);
};

export const compareHashPassword = (pwd: string, hashedPwd: string) => {
	return compareSync(pwd, hashedPwd)
}
