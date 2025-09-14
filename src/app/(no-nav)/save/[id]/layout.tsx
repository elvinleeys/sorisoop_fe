import SaveDetailHeader from '@/components/header/SaveDetailHeader';
import { ReactNode } from 'react';

interface SaveDetailLayoutProps {
  children: ReactNode;
}

export default function NoNavLayout({ children } : SaveDetailLayoutProps) {
    return (
        <>
            <SaveDetailHeader />
            <main className="px-[1rem]">
                {children}
            </main>     
        </>
    );
}