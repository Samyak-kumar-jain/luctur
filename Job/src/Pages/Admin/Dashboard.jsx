import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllPurchaseAdminCourseQuery } from '@/Features/Apis/purcaseApi';
import React from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetAllPurchaseAdminCourseQuery();

  console.log(data)
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading data!</h1>;
  }

  // Destructure the data from the response
  const purchaseCourse = data?.purchasedCourses || [];

  // Prepare data for charts and cards
  const totalSales = purchaseCourse.length; // Count the total number of purchases
  const totalRevenue = purchaseCourse.reduce((acc, course) => acc + (course.amount || 0), 0); // Calculate total revenue

  const courseData = purchaseCourse.map((course) => ({
    name: course?.courseId?.courseTitle || 'Unknown Title',
    price: course?.courseId?.coursePrice || 0,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-gray-900/10">
      {/* Card: Total Sales */}
      <Card className="w-full max-w-xs mx-auto bg-gray/30">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalSales}</p>
        </CardContent>
      </Card>

      {/* Card: Total Revenue */}
      <Card className="w-full max-w-xs mx-auto bg-gray/30">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">₹{totalRevenue.toFixed(2)}</p>
        </CardContent>
      </Card>

      {/* Card: Course Prices Chart */}
     {
      totalSales ?  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 bg-gray-900/10">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-300">
          Course Prices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={courseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              angle={0}
              textAnchor="end"
              interval={1}
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="#6b7280" className="bg-gray-900/10" tick={{ fontSize: 12 }} />
            <Tooltip
              className="bg-gray-900/10"
              formatter={(value, name) => [`₹${value}`, name]}
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: '5px',
                color: '#fff',
              }}
            />
            <ReferenceLine y={0} stroke="#000" />
            <Line
              type="monotone"
              dataKey="price"
              stroke="url(#priceGradient)"
              strokeWidth={3}
              dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card> :""
     }
    </div>
  );
};

export default Dashboard;
