import { ReactNode } from 'react';
import NavBar from '@/components/nav/NavBar';
import PageTransition from '@/components/animate/pageTransition/PageTransition';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children } : MainLayoutProps) {
    return (
        <>
            <PageTransition>
                {children}
            </PageTransition>
            <div id="place-detail"></div>
            <div id="bottom-sheet"></div>
            <NavBar />        
        </>
    );
}