import {
  Thermometer,
  Droplets,
  Sun,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  Clock,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

// Demo environmental readings
const environmentData = {
  temperature: 34.5,
  humidity: 68,
  lightIntensity: 12500,
  lastUpdated: "Just now",
};

// Demo temperature history
const temperatureHistory = [
  { time: "8 AM", value: 27 },
  { time: "9 AM", value: 28 },
  { time: "10 AM", value: 30 },
  { time: "11 AM", value: 32 },
  { time: "12 PM", value: 34.5 },
  { time: "1 PM", value: 33 },
  { time: "2 PM", value: 32 },
  { time: "3 PM", value: 31 },
];

// Demo humidity history
const humidityHistory = [
  { time: "8 AM", value: 82 },
  { time: "9 AM", value: 79 },
  { time: "10 AM", value: 75 },
  { time: "11 AM", value: 72 },
  { time: "12 PM", value: 68 },
  { time: "1 PM", value: 69 },
  { time: "2 PM", value: 71 },
  { time: "3 PM", value: 73 },
];

// Demo light intensity history
const lightHistory = [
  { time: "8 AM", value: 4500 },
  { time: "9 AM", value: 6500 },
  { time: "10 AM", value: 9000 },
  { time: "11 AM", value: 11000 },
  { time: "12 PM", value: 14500 },
  { time: "1 PM", value: 13500 },
  { time: "2 PM", value: 12500 },
  { time: "3 PM", value: 9500 },
];

function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  status,
  description,
  iconColor,
  iconBg,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex items-baseline gap-1 mt-2">
            <h2 className="text-3xl font-bold text-gray-800">
              {value}
            </h2>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
        </div>

        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500">{description}</span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
          {status}
        </span>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  data,
  color,
  unit,
  threshold,
  thresholdLabel,
  domain,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={domain || ["auto", "auto"]}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              width={45}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                fontSize: "12px",
              }}
              formatter={(value) => [`${value} ${unit}`, title]}
            />

            {threshold !== undefined && (
              <ReferenceLine
                y={threshold}
                stroke="#E59A35"
                strokeDasharray="5 5"
                label={{
                  value: thresholdLabel,
                  position: "insideTopRight",
                  fill: "#C88720",
                  fontSize: 11,
                }}
              />
            )}

            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={{ r: 3, fill: color }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Environment() {
  const { temperature, humidity, lightIntensity, lastUpdated } =
    environmentData;

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Environment Monitoring
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor environmental conditions inside your growing enclosure.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white border border-gray-100 rounded-lg px-3 py-2 w-fit">
          <Clock size={15} />
          Last updated: {lastUpdated}
        </div>
      </div>

      {/* Current Readings */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">
            Current Conditions
          </h2>
          <span className="text-xs text-gray-400">
            Growing enclosure
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <MetricCard
            title="Temperature"
            value={temperature}
            unit="°C"
            icon={Thermometer}
            status="High"
            description="Above example threshold"
            iconColor="text-orange-600"
            iconBg="bg-orange-50"
          />

          <MetricCard
            title="Relative Humidity"
            value={humidity}
            unit="%"
            icon={Droplets}
            status="Normal"
            description="Current moisture level"
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
          />

          <MetricCard
            title="Light Intensity"
            value={lightIntensity.toLocaleString()}
            unit="lux"
            icon={Sun}
            status="Normal"
            description="Ambient brightness"
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
          />
        </div>
      </section>

      {/* Temperature Chart */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold text-gray-800">
            Environmental Trends
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Historical environmental readings throughout the day.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ChartCard
            title="Temperature Trend"
            subtitle="Temperature changes throughout the day"
            data={temperatureHistory}
            color="#E58B42"
            unit="°C"
            threshold={32}
            thresholdLabel="Example threshold"
            domain={[20, 40]}
          />

          <ChartCard
            title="Humidity Trend"
            subtitle="Relative humidity changes throughout the day"
            data={humidityHistory}
            color="#398ACB"
            unit="%"
            domain={[40, 100]}
          />

          <ChartCard
            title="Light Intensity Trend"
            subtitle="Ambient light intensity throughout the day"
            data={lightHistory}
            color="#D6A43B"
            unit="lux"
            domain={[0, 20000]}
          />
        </div>
      </section>

      {/* Environmental Insights */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-4">
          Environmental Insights
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-orange-600" size={20} />
              <h3 className="font-semibold text-orange-900">
                High Temperature Detected
              </h3>
            </div>

            <p className="text-sm text-orange-800 mt-3 leading-relaxed">
              The current temperature is {temperature}°C, exceeding the
              example threshold of 32°C. The ventilation controller
              should evaluate whether additional cooling is required.
            </p>

            <p className="text-xs text-orange-700 mt-3">
              Ventilation decisions also depend on battery availability
              and configured safety constraints.
            </p>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <TrendingDown className="text-green-700" size={20} />
              <h3 className="font-semibold text-green-900">
                Humidity Within Normal Range
              </h3>
            </div>

            <p className="text-sm text-green-800 mt-3 leading-relaxed">
              The current relative humidity is {humidity}%. Continue
              monitoring humidity changes to understand the enclosure's
              environmental conditions.
            </p>

            <p className="text-xs text-green-700 mt-3">
              Humidity is monitored as an environmental indicator.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center pb-4">
        EcoCool Node · Environmental Monitoring · Simulated Data
      </div>

    </div>
  );
}
