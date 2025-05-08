import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Notebook Details',
    description: 'View and manage notebook details',
};

export default function NotebookLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}