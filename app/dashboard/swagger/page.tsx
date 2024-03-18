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
    address?: string;
    module?: string;
    baseUrl?: string;
  };
}) => {
  let swaggerDocs: Swagger.Response | SwaggerV2.Response | null;
  try {
    swaggerDocs = searchParams?.address
      ? await fetchSwaggerDocs(searchParams.address)
      : null;
  } catch (err) {
    throw(err)
  }

  const current = Number(searchParams?.current) || 0;

  const contentStyle: React.CSSProperties = {
    // height: '260px',
    marginTop: 16,
  };

  let startPath = searchParams?.baseUrl || '/';
  startPath = startPath.endsWith("/") ? startPath : `${startPath}/`

  const pathList = Object.keys(swaggerDocs?.paths || {}).reduce(
    (target, current) => {
      if (!current.startsWith(startPath)) {
        return target;
      }
      const pathNameList = current.replace(startPath, '').split('/')
      if (pathNameList[0] && !target.includes(pathNameList[0]) && pathNameList.length >= 2) {
        return [
          ...target,
          pathNameList[0]
        ]
      }
      return target;
    },
    [] as string[],
  );

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        {current === 0 && <Step1Page pathList={pathList} />}
        {current === 1 && swaggerDocs && searchParams?.module && (
          <Step2Page swaggerDocs={swaggerDocs} moduleName={searchParams.module} baseUrl={startPath} />
        )}
        {current === 2 && <div>Last-content</div>}
      </div>
      <ActionBar current={current} stepCount={items.length} />
    </>
  );
};

export default App;
