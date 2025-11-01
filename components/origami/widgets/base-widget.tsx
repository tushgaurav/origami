// Origami Base Widget Component

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type WidgetProps = React.ComponentProps<"div"> & {
    size?: "small" | "medium" | "large";
    refreshInterval?: number;
}

export function Widget({children, size = "medium", refreshInterval = 0, ...props}: WidgetProps) {
    const sizeClasses = {
        small: "w-full max-w-sm",
        medium: "w-full max-w-md",
        large: "w-full max-w-lg",
    }

    return (
        <Card {...props} className={cn("bg-background text-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", sizeClasses[size], props.className)}>
            {children}
        </Card>
    )
}

export function WidgetHeader({children, ...props}: React.ComponentProps<"div">) {
    return (
        <CardHeader {...props}>
            {children}
        </CardHeader>
    )
}

export function Title({children, ...props}: React.ComponentProps<"div">) {
    return (
        <CardTitle {...props}>
            {children}
        </CardTitle>
    )
}

export function Description({children, ...props}: React.ComponentProps<"div">) {
    return (
        <CardDescription {...props}>
            {children}
        </CardDescription>
    )
}

export function WidgetContent({children, ...props}: React.ComponentProps<"div">) {
    return (
        <CardContent {...props}>
            {children}
        </CardContent>
    )
}