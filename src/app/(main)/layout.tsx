import { ReactNode } from 'react';
import '../globals.css';
import NavBar from '@/components/nav/NavBar';
import PageTransition from '@/components/pageTransition/PageTransition';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children } : MainLayoutProps) {
    return (
        <>
            <PageTransition>
                {children}
            </PageTransition>
            <NavBar />        
        </>
    );
}