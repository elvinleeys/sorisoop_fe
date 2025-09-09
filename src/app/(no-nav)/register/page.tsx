import { RegisterHeader } from "@/components/header";
import RegisterMap from "@/components/register/mapSection/RegisterMap";
import RegisterForm from "@/components/register/registerForm/RegisterForm";

export default function Register() {
    return (
        <>
            <RegisterHeader />
            <main className="px-[1rem]">
                <RegisterMap />
                <RegisterForm />
            </main>
        </>
    );
}