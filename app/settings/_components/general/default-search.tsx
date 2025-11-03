"use client"

import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { useEffect } from "react";
import { changeDefaultSearch } from "./actions";

export default function DefaultSearch({ defaultSearch }: { defaultSearch: string }) {
    const [search, setSearch] = React.useState(defaultSearch);
    
    useEffect(() => {
        if (search !== defaultSearch) {
            changeDefaultSearch(search);
        }
    }, [search]);

    return (
        <form>
            <Field>
                <FieldLabel htmlFor="default-search">Default Search</FieldLabel>
                <div>
                    <Select defaultValue={search} onValueChange={(value) => {
                        setSearch(value);
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select"  />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Popular</SelectLabel>
                                <SelectItem value="google">Google</SelectItem>
                                <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
                                <SelectItem value="bing">Bing</SelectItem>
                                <SelectItem value="brave">Brave</SelectItem>
                                <SelectItem value="youtube">YouTube</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <FieldDescription>
                    Select the default search engine for your dashboard.
                </FieldDescription>
            </Field>
        </form>
    )
}
