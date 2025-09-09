import { Metadata } from 'next';

export const metadata: Metadata = {
    title:
        "Mimstore Dashboard",
    description: "store managment system",
};

export default function DashLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}