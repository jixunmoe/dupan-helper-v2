export type FunctionArguments<F extends Function> = F extends (
  ...a: infer A
) => any
  ? A
  : never;

export type FunctionReturnValueType<F extends Function> = F extends (
  ...a: any[]
) => infer R
  ? R
  : never;
