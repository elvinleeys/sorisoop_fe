import { ReactNode } from 'react';
import PageTransition from '@/components/pageTransition/PageTransition';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children } : AuthLayoutProps) {
    return (
        <>
            <PageTransition>
                {children}
            </PageTransition>       
        </>
    );
}