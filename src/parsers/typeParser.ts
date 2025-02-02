import * as ts from "typescript";
import { IRTypeDefinition, IRType } from "../types";

export function parseType(typeNode: ts.TypeNode | undefined): IRTypeDefinition {
	if (!typeNode) {
		return { type: "void" };
	}

	// Handle Arrays: e.g., Array<string> -> { type: "array", valueType: { type: "string" } }
	if (ts.isArrayTypeNode(typeNode)) {
		return { type: "array", valueType: parseType(typeNode.elementType) };
	}

	// Handle Type References (e.g., Promise<T>, User, CustomType)
	if (ts.isTypeReferenceNode(typeNode)) {
		const typeName = typeNode.typeName.getText();

		// Handle Promises: Promise<string> -> { type: "Promise", valueType: { type: "string" } }
		if (typeName === "Promise") {
			const valueTypeNode = typeNode.typeArguments?.[0];
			return { type: "Promise", valueType: valueTypeNode ? parseType(valueTypeNode) : { type: "void" } };
		}

		// Handling Custom Types (Interfaces / Classes): Treat them as Objects 
		// We will just keep custom objects as it is instead of expanding at each nested definition.
		return { type: "object", valueType: { type: typeName } } as IRTypeDefinition;
	}

	const basicTypeMap: Record<string, IRType> = {
		number: "number",
		string: "string",
		boolean: "boolean",
		void: "void",
	};

	const typeText = typeNode.getText();
	return basicTypeMap[typeText] ? { type: basicTypeMap[typeText] } as IRTypeDefinition : { type: "object", valueType: { type: typeText } } as IRTypeDefinition;
}
