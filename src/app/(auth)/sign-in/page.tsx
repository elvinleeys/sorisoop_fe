import { SignInHeader } from "@/components/header";
import SignInLogo from "@/components/signIn/logo/SignInLogo";
import SignInForm from "@/components/signIn/signInForm/SignInForm";
import SignInNavList from "@/components/signIn/signInNavList/SignInNavList";

export default function SignInPage() {
    return (
        <>
            <SignInHeader />
            <main className="px-4">
                <SignInLogo />
                <SignInForm />
                <SignInNavList />
            </main>
        </>
    );
}