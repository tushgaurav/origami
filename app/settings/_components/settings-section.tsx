import { Separator } from "@/components/ui/separator";

export default function SettingsSection({ title, description, children }: { title: string, description?: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2 mt-6 mb-4">
            <div>
                <h2 className="text-xl font-bold">{title}</h2>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            <Separator className="my-2" />
            <div>
                {children}
            </div>
        </div>
    );
}

