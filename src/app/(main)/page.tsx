"use client";

import { MainHeader } from "@/components/header";
import MeasurementCard from "@/components/measurement/measurementCard/MeasurementCard";


export default function Home() {
    return (
        <>
            <MainHeader />
            <main className="pr-[1.125rem] pl-[1.0625rem]">
                <MeasurementCard />
            </main>
        </>
    );
}