"use client"
const DashboardView = ({ insights }) => {

    const salaryData = insights.salaryRanges.map((range) => (
        {
            name: range.role,
            min:range.min/1000,
            max:range.max/1000,
            medium:range.medium/1000,

        }));
    return (
        <div>DashboardView</div>
    )
}

export default DashboardView