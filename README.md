# TypeScript to Intermediate Representation (IR) Converter

## Overview
This tool parses TypeScript files and converts their type definitions into an Intermediate Representation (IR). The IR can then be used to generate equivalent types in other languages like Dart, or to convert back to TypeScript in a standardized format.

## Features
- Parses **Enums, Interfaces, Functions, and Records**.
- Extracts **comments** and retains documentation.
- Handles **nested types** and **generic types**.
- Supports **optional properties**.

## Installation
Clone the repository:
```sh
git clone https://github.com/yinstardev/typescript-ir.git
cd typescript-ir
```
Install dependencies:
```sh
npm install
```

## Usage

### 1️⃣ Convert a TypeScript File to IR
Run the script with a sample file:
```sh
npx ts-node src/index.ts
```
This will process `sample.ts` and generate `output.json`.

### 2️⃣ Convert a Custom File
Specify a different file to process:
```sh
npx ts-node src/index.ts path/to/custom-file.ts
```

### 3️⃣ Use in a Node.js REPL
```sh
npx ts-node
```
Then, run:
```ts
import { parseTypeScriptToIR } from "./src/index";
const ir = parseTypeScriptToIR("src/sample.ts");
console.log(JSON.stringify(ir, null, 2));
```

## Roadmap
- Support for more complex generic types.
- Converters for Dart, Kotlin, and other languages.
- CLI for easier usage.

## Contributing
Feel free to submit PRs or open issues to improve functionality.

## License
MIT License.

