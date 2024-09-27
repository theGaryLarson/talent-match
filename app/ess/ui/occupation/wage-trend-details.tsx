"use client"
import { useMediaQuery, useTheme } from "@mui/material";
import { IRelatedData } from "../../lib/data";
import { LineChart } from "@mui/x-charts";

function parseMonthYear(monthYear: string): Date {
  const [month, year] = monthYear.split(' ');
  return new Date(`${month} 1, ${year}`);
}

function extractWageTrend(data: IRelatedData): { cfa_monthyear: Date, cfa_advertisedwage: number }[] {
  return data.cfa_advertisedwagetrend_Occupation.map(item => ({
    cfa_monthyear: parseMonthYear(item.cfa_monthyear),
    cfa_advertisedwage: parseFloat(item.cfa_advertisedwage)
  }));
}

export default function WageTrendDetails({
  occupation,
}: {
  occupation: IRelatedData;
}) {
  const wageTrend = extractWageTrend(occupation);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  let chartWidth;
  if (isSmallScreen) {
    chartWidth = 300;
  } else if (isMediumScreen) {
    chartWidth = 500;
  } else if (isLargeScreen) {
    chartWidth = 425;
  }
  return (
    <LineChart
      xAxis={[
        {
          scaleType: "time",
          dataKey: 'cfa_monthyear'
        }]}
      series={[
        {
          dataKey: 'cfa_advertisedwage',
          label: 'Hourly wage ($)'
        },
      ]}
      dataset={wageTrend}
      axisHighlight={{
        x: 'none',
        y: 'none',
      }}
      width={chartWidth}
      height={350}
    />
  );
}