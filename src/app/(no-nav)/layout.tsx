import { ReactNode } from 'react';
import '../globals.css';
import PageTransition from '@/components/pageTransition/PageTransition';

interface NoNavLayoutProps {
  children: ReactNode;
}

export default function NoNavLayout({ children } : NoNavLayoutProps) {
    return (
        <>
            <PageTransition>
                {children}
            </PageTransition>       
        </>
    );
}