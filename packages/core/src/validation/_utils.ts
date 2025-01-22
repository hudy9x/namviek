import { Schema } from "zod";

export interface ParseResult {
	data: object | null;
	error: object | null;
	errorArr: Record<string, string>
}

export function safeParse(schema: Schema, inputData: object): ParseResult {
	let data = null, error = null;
	const errorArr: Record<string, string> = {}

	try {
		const result = schema.parse(inputData);
		data = result;
	} catch (e) {
		error = e as {[key: string]: unknown}

    // eslint-disable-next-line
		const issues = (error as any).issues
		issues.forEach((iss: { path: string[], message: string }) => {
			errorArr[iss.path[0]] = iss.message
		})
	}

  // eslint-disable-next-line
	return { data, error, errorArr }
}
