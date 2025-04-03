"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format, formatDistanceToNow } from "date-fns";
import { Brain, Briefcase, LineChart, TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const DashboardView = ({ insights }) => {

    const salaryData = insights.salaryRanges.map((range) => (
        {
            name: range.role,
            min: range.min / 1000,
            max: range.max / 1000,
            medium: range.median / 1000,

        }));

    const getDemandLevelColor = (level) => {
        switch (level.toLowerCase()) {
            case "high":
                return "bg-green-500";
            case "medium":
                return "bg-yellow-500";
            case "low":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    }
    const getMarketLookOutInfo = (outlook) => {
        switch (outlook.toLowerCase()) {
            case "positive":
                return { icon: TrendingUp, color: "text-green-500" }
            case "neutral":
                return { icon: LineChart, color: "text-yellow-500" }
            case "low":
                return { icon: TrendingDown, color: "text-red-500" }
            default:
                return { icon: LineChart, color: "text-gray-500" }
        }
    }

    const OutlookIcon = getMarketLookOutInfo(insights.marketOutlook).icon;
    const outLookColor = getMarketLookOutInfo(insights.marketOutlook).color;

    const lastUpdated = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
    const nextUpdateDistance = formatDistanceToNow(
        new Date(insights.nextUpdated),
        { addSuffix: true }
    );
    return (
        <div className="spacey-6">
            <div className="flex items-center justify-between">
                <Badge variant={"outline"}> lastUpdated: {lastUpdated}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* market outlook */}
                <Card>
                    <CardHeader className="flex flex-row  items-center justify-between space-y-0 pb-2">
                        <CardTitle className={"text-sm font-medium"}>Market Outlook</CardTitle>
                        <OutlookIcon className={` h-4 w-4 ${outLookColor}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {insights.marketOutlook}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Next update {nextUpdateDistance}
                        </p>
                    </CardContent>

                </Card>

                {/* industry growth */}
                <Card>
                    <CardHeader className="flex flex-row  items-center justify-between space-y-0 pb-2">
                        <CardTitle className={"text-sm font-medium"}>Industry Growth</CardTitle>
                        <TrendingUp className={` h-4 w-4 text-muted-foreground`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {insights.growthRate.toFixed(1)}%
                        </div>
                        <Progress value={insights.growthRate} className={"mt-2"} />
                    </CardContent>

                </Card>

                {/* demand level */}
                <Card>
                    <CardHeader className="flex flex-row  items-center justify-between space-y-0 pb-2">
                        <CardTitle className={"text-sm font-medium"}>Demand Level</CardTitle>
                        <Briefcase className={` h-4 w-4 text-muted-foreground`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {insights.demandLevel}
                        </div>
                        <div className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                            insights.demandLevel
                        )}`} />
                    </CardContent>

                </Card>
                {/* top skills */}
                <Card>
                    <CardHeader className="flex flex-row  items-center justify-between space-y-0 pb-2">
                        <CardTitle className={"text-sm font-medium"}>Top Skills</CardTitle>
                        <Brain className={` h-4 w-4 text-muted-foreground`} />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-1">
                            {insights.topSkills.map((skill) => (
                                <Badge key={skill} variant={"secondary"}>{skill}</Badge>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Next update {nextUpdateDistance}
                        </p>
                    </CardContent>
                </Card>
            </div>
            {/* bar chart */}

            <Card className={"mt-4"}>
                <CardHeader>
                    <CardTitle>Salary Ranges by Role</CardTitle>
                    <CardDescription>
                        Displaying minimum, medium, and maximum salaries (in thousands)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salaryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-background border rounded-lg p-2 shadow-md">
                                                <p className="font-medium">{label}</p>
                                                {payload.map((item) => (
                                                    <p key={item.name} className="text-sm">{item.name}: ${item.value}K</p>
                                                ))}
                                            </div>
                                        );
                                    }
                                    return null;
                                }} />
                                <Legend />
                                <Bar dataKey="min" fill="#F0F0D7" name="Min Salary(K)" />
                                <Bar dataKey="medium" fill="#D0DDD0" name="Medium Salary(K)" />
                                <Bar dataKey="max" fill="#AAB99A" name="Max Salary(K)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default DashboardView