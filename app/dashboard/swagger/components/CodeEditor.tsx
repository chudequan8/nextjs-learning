'use client';
import { FC } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor: FC<{value: string}> = ({value}) => {
  return (
    <Editor
      theme="vs-dark"
      height="800px"
      defaultLanguage="typescript"
      value={value}
    />
  );
};

export default CodeEditor;
