import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Trodat Register Page',
    description: 'View and manage your trodat register',
};

export default function AccountsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}