"use client";

import { onboardingSchema } from "@/app/lib/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
const OnboardForm = ({ industries }) => {
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(onboardingSchema),

    })
    return (
        <div className="flex items-center justify-center bg-background">
            <Card className={"w-full max-w-lg mt-10 mx-20"}>
                <CardHeader>
                    <CardTitle>Complete your profile</CardTitle>
                    <CardDescription>Select your industry to get personalized career  insights and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                
            </Card>

        </div>
    )
}

export default OnboardForm