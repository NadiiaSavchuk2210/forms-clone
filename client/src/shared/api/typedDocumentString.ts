// graphql-codegen's RTK Query plugin references `TypedDocumentString` at runtime.
// Some codegen configs don't emit the class definition into `generated`, so we provide it here once.
class TypedDocumentStringImpl extends String {
  private readonly value: string;

  constructor(value: string) {
    super(value);
    this.value = value;
  }

  override toString(): string {
    return this.value;
  }
}

  export { TypedDocumentStringImpl as TypedDocumentString };

declare global {
  var TypedDocumentString: typeof TypedDocumentStringImpl;
}

// Expose as a global identifier (so `generated/index.ts` can access it without importing).
globalThis.TypedDocumentString = TypedDocumentStringImpl;

  export { };
