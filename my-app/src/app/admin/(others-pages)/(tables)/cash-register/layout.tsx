import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cash Register Page',
    description: 'View and manage your cash register',
};

export default function AccountsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}