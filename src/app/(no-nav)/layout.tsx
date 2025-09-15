import { ReactNode } from 'react';
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