"use client";

import { RegisterHeader } from "@/components/header";
import RegisterMap from "@/components/register/mapSection/RegisterMap";
import RegisterForm from "@/components/register/registerForm/RegisterForm";
import { useEnsureMeasurement } from "@/hook/useEnsureMeasurement";

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