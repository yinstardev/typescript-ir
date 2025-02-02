import * as ts from "typescript";
import { IR, EnumIR } from "../types";
import { extractComments } from "../utils";

export function parseEnum(node: ts.EnumDeclaration, ir: IR, comment?: string) {
	console.log("Processing Enum:", node.name.text);

	const enumName = node.name.text;
	const isExported = node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword) || false; 
	const values: { name: string; value: string | number, comment?: string }[] = [];
	const sourceFile = node.getSourceFile();

	node.members.forEach((member, index) => {
		console.log("Processing Enum Member:", member.getText());

		if (!member.name) {
			console.error("Error: Enum member name is undefined!", member);
			return;
		}

		const name = member.name.getText();

		let initializer: string | number = index;

		if (member.initializer) {
			try {
				const initText = member.initializer.getText();
				initializer = isNaN(Number(initText)) ? initText.replace(/['"]/g, "") : Number(initText); 
			} catch (error) {
				console.error("Error while parsing enum initializer:", error);
				initializer = index; 
			}
		}
		
		const enumComment = extractComments(sourceFile, member);
		values.push({ name, value: initializer, comment: enumComment });
	});

	ir.types.push({
		name: enumName,
		type: "enum",
		exported: isExported,
		values,
		comment,
	} as EnumIR);

	console.log("Final Enum IR:", ir.types[ir.types.length - 1]); 
}
