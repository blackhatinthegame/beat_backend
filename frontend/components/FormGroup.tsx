"use client";

import { ReactNode } from 'react';

interface FormGroupProps {
  label: string;
  children: ReactNode;
  optional?: boolean;
}

export default function FormGroup({ label, children, optional }: FormGroupProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[#c7c7c9] tracking-wide">
        {label}
        {optional && <span className="text-neutral-500 ml-1">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

