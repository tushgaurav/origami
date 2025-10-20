import { cn } from "@/lib/utils";

export function Page({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <main className={cn("min-h-screen bg-background text-foreground max-w-screen-lg mx-auto px-4 py-8", className)}>
            {children}
        </main>
    );
}

export function PageHeader({ heading, children, className }: { heading: string, children?: React.ReactNode, className?: string }) {
    return (
        <h1 className={cn("text-2xl font-bold mb-4", className)}>
            {heading}
            {children}
        </h1>
    );
}