"use client";

import { updateUser } from "@/action/user";
import { onboardingSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
const OnboardForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  const { loading: updateLoading, fun: updateUserFn, data: updateResult } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });


  const onSubmit = async (values) => {

    try {
      console.log(values);
      const formattedIndustry = `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`;
      await updateUserFn({
        ...values,
        industry: formattedIndustry,

      }
      )
    } catch (error) {

    }
  };

  const watchIndustry = watch("industry");

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully.")
      router.push("/dashboard");
      router.refresh();

    }

  }, [updateResult, updateLoading]);

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className={"w-full max-w-lg mt-10 mx-20"}>
        <CardHeader>
          <CardTitle className={"gradient gradient-title text-4xl"}>
            Complete your profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* for industry */}
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry" className={"w-full "}>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => {
                    return (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {watchIndustry && (
              // for subIndustry
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specializations</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("industry", value);
                  }}
                >
                  <SelectTrigger id="subIndustry" className={"w-full "}>
                    <SelectValue placeholder="Select subIndustry" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((ind) => {
                      return (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* for experience */}
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                placeholder="Enter years of experience"
                id="experience"
                type={"number"}
                min="0"
                max="50"
                {...register("experience")}
              />

              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* skills */}
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                placeholder="e.g., python, java, typeScript, project management"
                id="skills"
                {...register("skills")}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>

              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* for bio */}

            <div className="space-y-2">
              <Label htmlFor="bio">Personal Bio</Label>
              <Textarea
                placeholder="Tell us your your professional background..."
                id="bio"
                className={"h-32"}
                {...register("bio")}
              />


              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>
            <Button type="submit" className={"w-full"} disabled={updateLoading}>

              {
                updateLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>

                ) : (
                  "Complete Profile"
                )
              }</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardForm;
