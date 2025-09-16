import ExternalStepIndicator from "@/components/externalStepIndicator/ExternalStepindicator";
import { SignUpHeader } from "@/components/header";
import { ReactNode } from "react";

interface SignUpLayoutProps {
  children: ReactNode;
}

export default function SignUpLayout({ children }: SignUpLayoutProps) {
    return (
        <>
            <SignUpHeader />
            <ExternalStepIndicator />
            <main className="px-4 pb-16.5">
                {children}
            </main>
        </>
    );
}