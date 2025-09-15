import Link from "next/link";

export default function SignInHeader() {
    return (
        <header className="w-full py-3 px-4 flex justify-end">
            <Link 
                href="/" 
                className="text-lg leading-[0.5] text-primary"
            >
                건너뛰기
            </Link>
        </header>
    );
}