declare namespace Schema {
  type BaseSchema = {
    example?: unknown;
    description?: string;
  };

  type IntSchema = BaseSchema & {
    type: 'integer';
    format: 'int32' | 'int64';
  };

  type BooleanSchema = BaseSchema & {
    type: 'boolean';
  };

  type VoidSchema = BaseSchema & {
    type: 'void';
  };

  type StringSchema = BaseSchema & {
    type: 'string';
    format?: 'binary' | 'date-time';
  };

  type FileSchema = BaseSchema & {
    type: 'file';
  };

  type ObjectSchema<T extends string = 'init'> = BaseSchema & {
    type: 'object';
    name: T extends 'init' ? string | undefined : string;
    properties?: Record<
      string,
      AllSchema<T> | (T extends 'init' ? RefSchema : never)
    >;
    required?: string[];
    title?: string;
    generic?: boolean;
  };

  type ArraySchema<T extends string = 'init'> = BaseSchema & {
    type: 'array';
    items: AllSchema<T> | (T extends 'init' ? RefSchema : never);
    /* 只有在type为array时才有这个字段 */
    collectionFormat?: 'multi';
  };

  type AllSchema<T extends string = 'init'> =
    | IntSchema
    | BooleanSchema
    | VoidSchema
    | StringSchema
    | ObjectSchema<T>
    | ArraySchema<T>
    | GenericSchema;

  type GenericSchema = BaseSchema & {
    type: 'generic';
  };

  type RefSchema = {
    originalRef: string;
    $ref: string;
  };

  type AllSchemaWithRef = AllSchema | RefSchema;

  type ParsedArraySchema = ArraySchema<'parsed'>;
  type ParsedObjectSchema = ObjectSchema<'parsed'>;

  type ParsedSchema = AllSchema<'parsed'> & {
    returnType?: string;
  };
}
