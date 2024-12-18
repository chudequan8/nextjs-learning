import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';

import fhirSchema from './fhir.schema.json';
import JsonSchemaToTs from './SchemaToTs';
import CodeEditor from '../swagger/components/CodeEditor';
import { formatTsString } from '@/app/utils/format';

export const metadata: Metadata = {
  title: 'FHIR API',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    resource?: string;
  };
  }) {
  
  const jsonSchemaToTs = new JsonSchemaToTs(fhirSchema as any)

  const resourceName = searchParams?.resource || 'Condition'
  const dqdq = jsonSchemaToTs.generateSchemaByResourceName(resourceName);
  const formatedStr = await formatTsString(dqdq);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>FHIR API</h1>
      </div>
      <CodeEditor value={formatedStr} />
    </div>
  );
}
