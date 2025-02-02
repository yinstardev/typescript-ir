import * as ts from "typescript";
import { IR, InterfaceIR, FunctionIR, IRTypeDefinition, RecordIR } from "../types";
import { parseType } from "./typeParser";
import { extractComments as getPropertyComments } from "../utils";

export function parseInterface(node: ts.InterfaceDeclaration, ir: IR, comment?: string) {
  const interfaceName = node.name.text;
  const isExported = node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword) || false;
  const properties: {
    name: string;
    type: IRTypeDefinition | FunctionIR;
    optional: boolean;
    comment?: string;
  }[] = [];

  const sourceFile = node.getSourceFile();

  node.members.forEach((member: any) => {
    const propName = member.name.getText();
    const isOptional = !!member.questionToken;
    const propComment = getPropertyComments(sourceFile, member);

    if (ts.isMethodSignature(member)) {
      const isAsync = member.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.AsyncKeyword) || false;
      const parameters = member.parameters.map((param) => ({
        name: param.name.getText(),
        type: param.type ? parseType(param.type) : { type: "void" }
      }));
      const returnType = member.type ? parseType(member.type) : { type: "void" };

      properties.push({
        name: propName,
        type: {
          type: "function",
          async: isAsync,
          parameters,
          returns: returnType
        } as FunctionIR,
        optional: isOptional,
        comment: propComment
      });
    }

    else if (ts.isPropertySignature(member) && member.type) {
      const parsedType = parseType(member.type);

      if (ts.isTypeReferenceNode(member.type) && member.type.typeName.getText() === "Record") {
        const keyType = member.type.typeArguments?.[0]?.getText() || "string";
        const valueType = member.type.typeArguments?.[1] ? parseType(member.type.typeArguments[1]) : { type: "any" };

        properties.push({
          name: propName,
          type: { type: "Record", keyType, valueType } as RecordIR,
          optional: isOptional,
          comment: propComment
        });

      } else {
        properties.push({
          name: propName,
          type: parsedType,
          optional: isOptional,
          comment: propComment
        });
      }
    }
  });

  ir.types.push({ name: interfaceName, type: "interface", exported: isExported, properties, comment });
}
