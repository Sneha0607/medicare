import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Title from "./dashboard/title";

function createData(date, sugarLevel) {
  return { date, sugarLevel };
}

const BPGraph = (props) => {
  const theme = useTheme();
  const [sugarLevels, setSugarLevels] = useState([]);

  useEffect(() => {
    db.collection("patients")
      .doc(props.uid)
      .collection("bloodSugarLevel")
      .onSnapshot((snapshot) => {
        setSugarLevels(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const data = [];
  {
    sugarLevels.map((sugar) => {
      data.push(
        createData(
          new Date(sugar.sentAt.seconds * 1000).toLocaleDateString("en-US"),
          sugar.sugarLevel
        )
      );
    });
  }

  return (
    <React.Fragment>
      <Title>Blood Sugar Level</Title>
      <ResponsiveContainer width="100%">
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sugar-Level (mg/dL)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="sugarLevel"
            activeDot={{ r: 8 }}
            stroke={theme.palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default BPGraph;
