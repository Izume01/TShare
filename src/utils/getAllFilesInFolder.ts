import fs from "node:fs";
import path from "node:path";

export function getAllFiles(dirr: string): string[] {
	const normalizedDir = path.normalize(dirr);
	let filePaths: string[] = [];

	const files = fs.readdirSync(normalizedDir, { withFileTypes: true });

	for (const file of files) {
		const fullPath = path.join(normalizedDir, file.name);

		if (file.isDirectory()) {
			filePaths = filePaths.concat(getAllFiles(fullPath));
		} else {
			filePaths.push(fullPath);
		}
	}

	return filePaths;
}
