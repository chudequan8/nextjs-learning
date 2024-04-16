## 一个Swagger文档转Typescript请求方法工具

#### 使用方法
一、输入在线Swagger文档地址/选择本地Swagger文档上传
二、填写参数配置
1. 输入接口文档API path的根路径，默认是'/'
2. 选择接口模块路径（因为本工具是根据模块生成对应请求方法的，所以该项必填）
3. 输入要忽略的全局基础类型，默认为空
三、点击下一步生成对应请求方法和ts定义

#### 待开发功能
- [ ] 支持swagger文档上传
- [ ] 支持请求方法和ts定义文件下载
- [ ] 请求参数支持formData类型
- [ ] 特殊类型（Map、JSONOBJECT等）处理）
- [ ] 枚举根据描述通过gpt生成对应类型
- [ ] required 字段处理
- [ ] 优化泛型类型生成
- [ ] 合并3.0和2.0版本


#### 本地开发
1. pnpm install
2. pnpm run dev
3. 浏览器打开 http://localhost:3000/dashboard/swagger