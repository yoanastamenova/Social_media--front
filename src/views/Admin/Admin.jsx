import React from "react";
import { Box, Card, Typography, Grid } from "@mui/material";
import Navbar from "../../views/navbar/nav";
import Sidebar from "../../components/Sidebar";
import PeopleIcon from "@mui/icons-material/People";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  Text,
} from "recharts";

const data = [
  { name: "Oct", users: 400, posts: 1234, comments: 240 },
  { name: "Nov", users: 800, posts: 798, comments: 139 },
  { name: "Dec", users: 1200, posts: 2600, comments: 1880 },
  { name: "Jan", users: 1500, posts: 1600, comments: 980 },
  { name: "Feb", users: 1700, posts: 3600, comments: 1080 },
  { name: "Mar", users: 2000, posts: 5600, comments: 1980 },
];

const pieData = [
  { name: "Posts", value: data.reduce((acc, curr) => acc + curr.posts, 0) },
  {
    name: "Comments",
    value: data.reduce((acc, curr) => acc + curr.comments, 0),
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, index } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {pieData[index].name}
    </text>
  );
};

const InfoCard = ({ icon, title, number, percentChange }) => (
  <Card sx={{ minWidth: 250, textAlign: "center", p: 2, flex: 1 }}>
    {icon}
    <Typography variant="h5" component="div">
      {title}
    </Typography>
    <Typography variant="h4" component="p">
      {number}
    </Typography>
    <Typography
      sx={{ mb: 1.5, color: percentChange.includes("-") ? "red" : "green" }}
      color="text.secondary"
    >
      {percentChange}
    </Typography>
  </Card>
);

const Admin = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        <Sidebar />
        <Box padding="2rem 6%">
          <h1>DASHBOARD</h1>
          <h2>Welcome to the Dashboard</h2>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            flexWrap="wrap"
            gap="30px"
            m={3}
          >
            <InfoCard
              icon={<PeopleIcon fontSize="large" />}
              title="Total Users"
              number="945"
              percentChange="+12% this month"
            />
            <InfoCard
              icon={<DescriptionOutlinedIcon fontSize="large" />}
              title="Total Posts"
              number="322"
              percentChange="-33% this month"
            />
            <InfoCard
              icon={<ChatBubbleOutlineIcon fontSize="large" />}
              title="Total Comments"
              number="1120"
              percentChange="+22% this month"
            />
            <InfoCard
              icon={<ThumbUpAltOutlinedIcon fontSize="large" />}
              title="Total Likes"
              number="8K"
              percentChange="+15% this month"
            />
          </Box>
          <br />
          <br />
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <LineChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="posts" stroke="#82ca9d" />
              </LineChart>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PieChart width={700} height={350}>
                <Pie
                  data={pieData}
                  cx={350} // Center x-coordinate adjusted for the new width
                  cy={175} // Center y-coordinate adjusted for the new height
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={140} // Slightly reduced outer radius
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
