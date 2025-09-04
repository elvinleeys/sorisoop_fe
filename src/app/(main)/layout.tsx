import { ReactNode } from 'react';
import '../globals.css';
import NavBar from '@/components/nav/NavBar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children } : MainLayoutProps) {
    return (
        <>
            {children}
            <NavBar />        
        </>
    );
}