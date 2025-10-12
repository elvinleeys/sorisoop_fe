import PageTransition from '@/components/animate/pageTransition/PageTransition';
import NavBar from '@/components/nav/NavBar';

interface MainLayoutProps {
  children: React.ReactNode;
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