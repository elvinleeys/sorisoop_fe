"use client";

import { flexCol, flexColCenter } from "@/mixin/style";
import { useState } from "react";
import { Button, EmailInput, PasswordInput } from "soridam-design-system";

export default function SignInForm () {
    const [password, setPassword] = useState<string>("");

    return (
        <section 
            className={`
                ${flexColCenter} 
                justify-center 
                gap-9.5
                mb-6
            `}
        >
            <div 
                className={`
                    w-[21.4375rem] 
                    ${flexCol}
                    gap-3
                `} 
            >
                <EmailInput />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <Button buttonType="primary" size="large" onClick={()=>{}}>
                로그인
            </Button>
        </section>
    );
}