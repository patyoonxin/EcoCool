
import {
  Sun,
  BatteryCharging,
  Zap,
  Activity,
  Clock,
  Info,
  CheckCircle,
  AlertTriangle,
  Fan,
  Cpu,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

// ======================================
// DEMO ENERGY READINGS
// ======================================

const energyData = {
  solarPower: 18.0,
  batteryLevel: 72,
  batteryVoltage: 12.4,
  systemConsumption: 8.0,
  fanPower: 6.0,
  controllerPower: 2.0,
  solarEnergyToday: 126,
  consumedEnergyToday: 54,
  lastUpdated: "Just now",
};

// Solar generation and power consumption (W)
const powerHistory = [
  { time: "8 AM", solar: 8, consumption: 3 },
  { time: "9 AM", solar: 12, consumption: 4 },
  { time: "10 AM", solar: 18, consumption: 5 },
  { time: "11 AM", solar: 22, consumption: 7 },
  { time: "12 PM", solar: 25, consumption: 8 },
  { time: "1 PM", solar: 21, consumption: 8 },
  { time: "2 PM", solar: 16, consumption: 6 },
  { time: "3 PM", solar: 12, consumption: 4 },
];

// Battery level history (%)
const batteryHistory = [
  { time: "8 AM", level: 55 },
  { time: "9 AM", level: 58 },
  { time: "10 AM", level: 63 },
  { time: "11 AM", level: 68 },
  { time: "12 PM", level: 74 },
  { time: "1 PM", level: 76 },
  { time: "2 PM", level: 74 },
  { time: "3 PM", level: 72 },
];

// ======================================
// REUSABLE METRIC CARD
// ======================================

function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  description,
  iconColor,
  iconBg,
  status,
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

      <div className="flex items-center justify-between mt-4 gap-2">
        <span className="text-xs text-gray-500">
          {description}
        </span>

        {status && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
            {status}
          </span>
        )}
      </div>
    </div>
  );
}

// ======================================
// REUSABLE CHART CARD
// ======================================

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>

      <div className="h-64">
        {children}
      </div>
    </div>
  );
}

// ======================================
// MAIN ENERGY PAGE
// ======================================

export default function Energy() {
  const {
    solarPower,
    batteryLevel,
    batteryVoltage,
    systemConsumption,
    fanPower,
    controllerPower,
    solarEnergyToday,
    consumedEnergyToday,
    lastUpdated,
  } = energyData;

  const batteryStatus =
    batteryLevel >= 50
      ? "Good"
      : batteryLevel >= 30
      ? "Moderate"
      : "Low";

  const solarSurplus = solarPower - systemConsumption;

  return (
    <div className="space-y-6">

      {/* PAGE HEADING */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Energy Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Monitor solar generation, battery condition and energy consumption.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white border border-gray-100 rounded-lg px-3 py-2 w-fit">
          <Clock size={15} />
          Last updated: {lastUpdated}
        </div>
      </div>

      {/* ENERGY OVERVIEW */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">
            Energy Overview
          </h2>

          <span className="text-xs text-gray-400">
            Current readings
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          <MetricCard
            title="Solar Generation"
            value={solarPower.toFixed(1)}
            unit="W"
            icon={Sun}
            description="Current solar output"
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
            status="Generating"
          />

          <MetricCard
            title="Battery Level"
            value={batteryLevel}
            unit="%"
            icon={BatteryCharging}
            description={`${batteryVoltage} V battery voltage`}
            iconColor="text-green-600"
            iconBg="bg-green-50"
            status={batteryStatus}
          />

          <MetricCard
            title="Power Consumption"
            value={systemConsumption.toFixed(1)}
            unit="W"
            icon={Zap}
            description="Current system load"
            iconColor="text-orange-600"
            iconBg="bg-orange-50"
          />

          <MetricCard
            title="Solar Surplus"
            value={solarSurplus.toFixed(1)}
            unit="W"
            icon={Activity}
            description="Generation minus load"
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
            status={solarSurplus >= 0 ? "Surplus" : "Deficit"}
          />

        </div>
      </section>

      {/* DAILY ENERGY SUMMARY */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-4">
          Daily Energy Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 rounded-xl">
                <Sun className="text-amber-600" size={23} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Energy Generated Today
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {solarEnergyToday} Wh
                </h3>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Accumulated solar energy generation
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-xl">
                <Zap className="text-orange-600" size={23} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Energy Consumed Today
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {consumedEnergyToday} Wh
                </h3>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Accumulated system energy consumption
            </p>
          </div>

        </div>
      </section>

      {/* POWER GENERATION VS CONSUMPTION */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-4">
          Energy Performance
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

          <ChartCard
            title="Solar Generation vs Consumption"
            subtitle="Power output and system load throughout the day (W)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={powerHistory}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                />

                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                  unit="W"
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    fontSize: "12px",
                  }}
                  formatter={(value) => `${value} W`}
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="solar"
                  name="Solar Generation"
                  stroke="#D6A43B"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />

                <Line
                  type="monotone"
                  dataKey="consumption"
                  name="Power Consumption"
                  stroke="#E58B42"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* BATTERY HISTORY */}
          <ChartCard
            title="Battery Level History"
            subtitle="Battery level changes throughout the day (%)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={batteryHistory}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="batteryGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#36B99A"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#36B99A"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                />

                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                  unit="%"
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    fontSize: "12px",
                  }}
                  formatter={(value) => `${value}%`}
                />

                <Area
                  type="monotone"
                  dataKey="level"
                  name="Battery Level"
                  stroke="#36B99A"
                  strokeWidth={3}
                  fill="url(#batteryGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

        </div>
      </section>

      {/* POWER DISTRIBUTION */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-4">
          Power Consumption Breakdown
        </h2>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-800">
                Current Power Distribution
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Estimated component power usage
              </p>
            </div>

            <span className="text-xl font-bold text-gray-800">
              {systemConsumption.toFixed(1)} W
            </span>
          </div>

          {/* FAN */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Fan size={17} className="text-teal-600" />
                <span className="text-sm text-gray-700">
                  Ventilation Fan
                </span>
              </div>

              <span className="text-sm font-semibold text-gray-800">
                {fanPower.toFixed(1)} W
              </span>
            </div>

            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full"
                style={{
                  width: `${(fanPower / systemConsumption) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* CONTROLLER */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Cpu size={17} className="text-blue-600" />
                <span className="text-sm text-gray-700">
                  Controller and Sensors
                </span>
              </div>

              <span className="text-sm font-semibold text-gray-800">
                {controllerPower.toFixed(1)} W
              </span>
            </div>

            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  width: `${(controllerPower / systemConsumption) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="border-t border-gray-100 mt-5 pt-4">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Total system consumption</span>
              <span className="font-semibold text-gray-800">
                {systemConsumption.toFixed(1)} W
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ENERGY INSIGHTS */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-4">
          Energy Insights
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-700" size={20} />

              <h3 className="font-semibold text-green-900">
                Solar Generation Exceeds Consumption
              </h3>
            </div>

            <p className="text-sm text-green-800 mt-3 leading-relaxed">
              Current solar generation is {solarPower.toFixed(1)} W,
              while system consumption is {systemConsumption.toFixed(1)} W.
              The simulated surplus is {solarSurplus.toFixed(1)} W.
            </p>

            <p className="text-xs text-green-700 mt-3">
              This indicates that solar generation is currently sufficient
              to cover the displayed system load.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <BatteryCharging className="text-blue-700" size={20} />

              <h3 className="font-semibold text-blue-900">
                Battery Monitoring
              </h3>
            </div>

            <p className="text-sm text-blue-800 mt-3 leading-relaxed">
              The battery is currently at {batteryLevel}% with a measured
              voltage of {batteryVoltage} V in this demo scenario.
            </p>

            <p className="text-xs text-blue-700 mt-3">
              The controller should consider battery reserves when
              determining ventilation operation.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
