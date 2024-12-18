export type ResourceDef = {
  description: string;
  additionalProperties: boolean;
  required: string[];
  properties: Record<string, any>;
}

export type JsonSchema = {
  $schema: string;
  id: string;
  description: string;
  discriminator: {
    propertyName: 'resourceType';
    mapping: Record<string, string>;
  };
  oneOf: Array<{
    $ref: string;
  }>;
  definitions: Record<string, ResourceDef>;
};
