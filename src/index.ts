import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";
import { IR } from "./types";
import { parseEnum } from "./parsers/enumParser";
import { parseInterface } from "./parsers/interfaceParser";
import { parseFunction } from "./parsers/functionParser";
import { extractComments } from "./utils";

/**
 * Converts a TypeScript file into IR format.
 * @param filePath The path to the TypeScript file
 * @returns The IR representation of the TypeScript file
 */
export function parseTypeScriptToIR(filePath: string): IR {
  const tsCode = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(filePath, tsCode, ts.ScriptTarget.Latest, true);
  const ir: IR = { types: [] };

  sourceFile.forEachChild((node) => {
    const comments = extractComments(sourceFile, node);

    if (ts.isEnumDeclaration(node)) {
      parseEnum(node, ir, comments);
    }
    if (ts.isInterfaceDeclaration(node)) {
      parseInterface(node, ir, comments);
    }
    if (ts.isFunctionDeclaration(node) && node.name) {
      parseFunction(node, ir, comments);
    }
  });

  return ir;
}

if (require.main === module) {
  const filePath = path.join(__dirname, "sample.ts");
  const ir = parseTypeScriptToIR(filePath);
  
  const outputPath = path.join(__dirname, "output.json");
  fs.writeFileSync(outputPath, JSON.stringify(ir, null, 2), "utf8");
  console.log(`IR successfully saved to ${outputPath}`);
}
