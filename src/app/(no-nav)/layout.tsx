import PageTransition from "@/components/animate/pageTransition/PageTransition";


interface NoNavLayoutProps {
  children: React.ReactNode;
}

export default function NoNavLayout({ children } : NoNavLayoutProps) {
    return (
        <PageTransition>
            {children}
        </PageTransition>
    );
}