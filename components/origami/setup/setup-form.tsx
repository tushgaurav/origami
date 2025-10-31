import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useActionState, useEffect } from "react";
import { ProceedType } from "./types";
import { setup } from "@/app/setup/action";

const initialState = {
    ok: false,
    proceed: ProceedType.FORM,
}

export function SetupForm({ className, ...props }: React.ComponentProps<"form"> & { setProceed: (proceed: ProceedType) => void }) {
    const [state, formAction, pending] = useActionState(setup, initialState)

    useEffect(() => {
        if (state.ok && state.proceed === ProceedType.WELCOME) {
            props.setProceed(ProceedType.WELCOME);
        }
    }, [state.ok, props.setProceed]);

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} action={formAction}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Setup your Origami</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Fill in the form below to setup your Origami
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="name">Your Name</FieldLabel>
                    <Input id="name" name="name" type="text" placeholder="Jeff Geerling" required />
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    <FieldDescription>
                        This will be used to send alerts. Origami does not collect your email.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Admin Password</FieldLabel>
                    <Input id="password" name="password" type="password" required />
                    <FieldDescription>
                        This will be used to access the admin panel.
                    </FieldDescription>
                </Field>
                <Field>
                    <Button type="submit" disabled={pending}>
                        {pending ? <Loader2 className="size-4 animate-spin" /> : "Complete Setup"}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}