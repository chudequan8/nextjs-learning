import React from 'react';
import { Steps } from 'antd';
import Step1Page from './components/Step1';
import Step2Page from './components/Step2';
import ActionBar from './components/ActionBar';
import { fetchSwaggerDocs } from '@/app/lib/data';

const steps = [
  {
    title: '第一步',
  },
  {
    title: '第二步',
  },
  {
    title: '第三步',
  },
];
const items = steps.map((item) => ({ key: item.title, title: item.title }));

const App: React.FC = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    current?: string;
    address: string;
  };
}) => {
  const swaggerDocs = await fetchSwaggerDocs(searchParams?.address);

  const current = Number(searchParams?.current) || 0;

  const contentStyle: React.CSSProperties = {
    height: '260px',
    marginTop: 16,
  };

  const pathList = Object.keys(swaggerDocs?.paths || {});

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        {current === 0 && <Step1Page pathList={pathList} />}
        {current === 1 && <Step2Page />}
        {current === 2 && <div>Last-content</div>}
      </div>
      <ActionBar current={current} stepCount={items.length} />
      <pre>{JSON.stringify(swaggerDocs, undefined, 2)}</pre>
    </>
  );
};

export default App;
