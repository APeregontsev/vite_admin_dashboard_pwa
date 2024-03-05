import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  CustomTick,
  CustomTooltipStyle,
  DiagramContainer,
  DiagramSubTitle,
  DiagramTitle,
  DiagramTitleWrapper,
  DiagramWrapper,
  RenderColorLegend,
} from "./style";
import { THEME } from "theme/constants/constants";
import { dateFormat } from "utils";

type ChartProps<DataType> = { data: DataType[] };

function Chart<DataType>({ data }: ChartProps<DataType>) {
  // Changing color of Yesterday legend name

  const renderColorLegend = (value: string, entry: any) => {
    const { color } = entry;
    if (entry.dataKey === "In progress") return <RenderColorLegend>{value}</RenderColorLegend>;

    return <span style={{ color }}>{value}</span>;
  };

  // Custom Tooltip

  const CustomTooltip = (props: any) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      return (
        <CustomTooltipStyle>
          <p>{`${payload[0].value}`}</p>
        </CustomTooltipStyle>
      );
    }

    return null;
  };

  // Customized Active DOT

  const CustomizedDot = (props: any) => {
    const { cx, cy } = props;

    return (
      <svg x={cx - 15} y={cy - 15} width={40} height={40} fill="none" viewBox="0 0 40 40">
        <g>
          <circle cx="15" cy="15" r="7" fill="white" />
          <circle cx="15" cy="15" r="5" stroke={THEME.lightTheme.colors.mainBlue} strokeWidth="4" />
          <circle
            opacity="0.16"
            cx="15"
            cy="15"
            r="13"
            stroke={THEME.lightTheme.colors.mainBlue}
            strokeWidth="2"
          />
        </g>
      </svg>
    );
  };

  // Customized Y_AXIS TICK

  function CustomTick_Y(props: any) {
    const { x, y, payload } = props;

    if (payload.value === 0)
      return (
        <g>
          <CustomTick x={x - 5} y={y - 7}>
            {payload.value}
          </CustomTick>
        </g>
      );

    if (payload.value < 10000)
      return (
        <g>
          <CustomTick x={x - 5} y={y - 7}>
            {payload.value}
          </CustomTick>
        </g>
      );

    return (
      <g>
        <CustomTick x={x - 25} y={y - 7}>
          {payload.value}
        </CustomTick>
      </g>
    );
  }

  // Customized X_AXIS TICK

  function CustomTick_X(props: any) {
    const { x, y, payload } = props;

    return (
      <g>
        <CustomTick x={x} y={y + 15}>
          {payload.value}
        </CustomTick>
      </g>
    );
  }

  // Displaying current Date

  const currentDate = dateFormat(new Date());

  return (
    <DiagramWrapper>
      <DiagramTitleWrapper>
        <DiagramTitle>Today's trend</DiagramTitle>
        <DiagramSubTitle>as of {currentDate}</DiagramSubTitle>
      </DiagramTitleWrapper>
      <DiagramContainer>
        <ResponsiveContainer width="100%" height="99%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            style={{ position: "absolute" }}
          >
            <defs>
              <linearGradient id="color_today" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={THEME.lightTheme.colors.mainBlue} stopOpacity={0.1} />
                <stop offset="95%" stopColor={THEME.lightTheme.colors.mainBlue} stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="color_yesterday" x1="0" y1="0" x2="0" y2="1">
                <stop offset="100%" stopColor={THEME.lightTheme.colors.grayscaleDivider} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={<CustomTick_X />}
              interval={0}
              padding={{ left: 0, right: 50 }}
            />
            <YAxis
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickSize={6}
              mirror={true}
              tick={<CustomTick_Y />}
            />
            <CartesianGrid vertical={false} strokeDasharray="1" />
            {/*   @ts-ignore */}
            <Tooltip allowEscapeViewBox={{ x: true, y: true }} content={<CustomTooltip />} />
            <Legend
              formatter={renderColorLegend}
              verticalAlign="top"
              height={36}
              width={220}
              wrapperStyle={{ right: "0%", top: "-7%" }}
            />
            <Area
              type="monotone"
              dataKey="Completed"
              stroke={THEME.lightTheme.colors.mainBlue}
              fillOpacity={1}
              fill="url(#color_today)"
              strokeWidth={2}
              activeDot={CustomizedDot}
              connectNulls
            />
            <Area
              type="monotone"
              dataKey="In progress"
              stroke={THEME.lightTheme.colors.grayscaleDivider}
              fillOpacity={1}
              fill="url(#color_yesterday)"
              strokeWidth={2}
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </DiagramContainer>
    </DiagramWrapper>
  );
}

export default Chart;
