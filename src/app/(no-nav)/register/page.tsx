"use client";

import { RegisterHeader } from "@/components/header";
import RegisterMap from "@/features/map/register/ui/RegisterMap";
import RegisterForm from "@/components/register/registerForm/RegisterForm";
import { useEnsureMeasurement } from "@/features/measurement/model/hooks/useEnsureMeasurement";

export default function Register() {
    useEnsureMeasurement();

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
