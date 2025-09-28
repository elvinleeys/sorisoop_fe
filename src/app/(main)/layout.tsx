import { ReactNode } from 'react';
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
            <div 
                id="place-detail" 
                className="fixed inset-x-0 bottom-[6.25rem] z-[9991]"
            ></div>
            <NavBar />        
        </>
    );
}