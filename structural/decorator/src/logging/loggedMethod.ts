let depth = 0;
/**
 * 
loggedMethod Bu TypeScript 5.0 dan beri tilga kiritilgan dekorator sintaksisi 
(@ belgisi bilan yoziladigan funksiya) uchun odatda shunday nom beriladigan oddiy funksiya. 
 */

export function loggedMethod<This, Args extends unknown[], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >,
) {
  const methodName = String(context.name);

  function replacementMethod(this: This, ...args: Args): Return {
    const className = (this as object).constructor.name;
    const indent = "  ".repeat(depth);
    console.log(`${indent}→ ${className}.${methodName}()`);

    depth++;
    try {
      const result = originalMethod.call(this, ...args);
      depth--;
      console.log(`${indent}← ${String(result)}`);
      return result;
    } catch (error) {
      depth--;
      console.log(`${indent}✖ ${className}.${methodName}() xato berdi`);
      throw error;
    }
  }

  return replacementMethod;
}
