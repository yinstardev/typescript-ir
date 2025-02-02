export type IRType =
  | "number"
  | "string"
  | "boolean"
  | "array"
  | "object"
  | "enum"
  | "function"
  | "Promise"
  | "class"
  | "void"
  | "Record";

export interface IRTypeDefinition {
  type: IRType;
  valueType?: IRTypeDefinition;
  comment?: string;
}

export interface RecordIR extends IRTypeDefinition {
	type: "Record";
	keyType: string;
	valueType: IRTypeDefinition;
	comment?: string;
}

export interface EnumIR {
  name: string;
  type: "enum";
  exported: boolean;
  values: { name: string; value: string | number, comment?: string }[];
  comment?: string;
}

export interface FunctionIR {
  name: string;
  type: "function";
  exported: boolean; 
  async: boolean;
  parameters: { name: string; type: IRTypeDefinition }[];
  returns: IRTypeDefinition;
  comment?: string;
}

export interface InterfaceIR {
  name: string;
  type: "interface";
  exported: boolean;
  properties: {
    name: string;
    type: IRTypeDefinition | FunctionIR;
    optional: boolean;
	comment?: string;
  }[];
  comment?: string;
}

export interface IR {
  types: (EnumIR | InterfaceIR | FunctionIR)[];
}
