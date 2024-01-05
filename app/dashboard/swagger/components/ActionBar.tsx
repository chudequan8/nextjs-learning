'use client';
import React from 'react';
import { Button, message } from 'antd';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ActionBar: React.FC<{ current: number; stepCount: number }> = ({
  current,
  stepCount,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (newCurrent: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('current', newCurrent.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div style={{ marginTop: 24 }}>
      {/* {current < stepCount - 1 && (
        <Link href={createPageURL(current + 1)}>
          <Button type="primary">下一步</Button>
        </Link>
      )} */}
      {current === stepCount - 1 && (
        <Button
          type="primary"
          onClick={() => message.success('Processing complete!')}
        >
          完成
        </Button>
      )}
      {current > 0 && (
        <Link href={createPageURL(current - 1)}>
          <Button style={{ margin: '0 8px' }}>上一步</Button>
        </Link>
      )}
    </div>
  );
};

export default ActionBar;
