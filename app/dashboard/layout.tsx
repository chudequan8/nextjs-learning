import SideNav from '@/app/ui/dashboard/sidenav';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </ConfigProvider>
  );
}
