"use client";
import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  isFetching?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
}

export const Table: React.FC<TableProps> = ({
  isFetching = false,
  isEmpty = false,
  isError = false,
  children,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
        {children}
      </table>
      {isError && (
        <div className="flex items-center justify-center w-full h-32 bg-red-100 mt-4 rounded-lg shadow-md">
          <div className="text-lg text-red-600">Ada kesalahan</div>
        </div>
      )}
      {isEmpty && !isFetching && !isError ? (
        <div className="flex items-center justify-center w-full h-32 bg-gray-100 mt-4 rounded-lg shadow-md">
          <div className="text-lg text-gray-500">Data tidak ditemukan</div>
        </div>
      ) : null}
    </div>
  );
};

interface TheadProps {
  children: ReactNode;
}

export const Thead: React.FC<TheadProps> = ({ children }) => {
  return <thead className="bg-gray-100">{children}</thead>;
};

interface TbodyProps {
  children: ReactNode;
}

export const Tbody: React.FC<TbodyProps> = ({ children }) => {
  return <tbody className="bg-white">{children}</tbody>;
};

interface TrProps {
  children: ReactNode;
}

export const Tr: React.FC<TrProps> = ({ children }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200" >
      {children}
    </tr>
  );
};

interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export const Th: React.FC<ThProps> = ({ children, ...props }) => {
  return (
    <th
      className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider bg-gray-200"
      {...props}
    >
      {children}
    </th>
  );
};

interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export const Td: React.FC<TdProps> = ({ children, ...props }) => {
  return (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b border-gray-200"
      {...props}
    >
      {children}
    </td>
  );
};
