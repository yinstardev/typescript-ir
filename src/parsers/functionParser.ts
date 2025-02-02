import * as ts from "typescript";
import { IR, FunctionIR, IRTypeDefinition } from "../types";
import { parseType } from "./typeParser";

export function parseFunction(node: ts.FunctionDeclaration, ir: IR, comment?: string) {
  if (!node.name) return;

  const functionName = node.name.text;
  const isAsync = node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.AsyncKeyword) || false;
  const parameters = node.parameters.map((param) => ({
    name: param.name.getText(),
    type: param.type ? parseType(param.type) : { type: "void" } as IRTypeDefinition,
  }));
  const returnType = node.type ? parseType(node.type) : { type: "void" } as IRTypeDefinition;

  ir.types.push({
    name: functionName,
    type: "function",
    exported: true, 
    async: isAsync,
    parameters,
    returns: returnType,
    comment,
  } as FunctionIR);
}
