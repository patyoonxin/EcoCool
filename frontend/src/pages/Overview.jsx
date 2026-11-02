
import {
  Thermometer,
  Droplets,
  Sun,
  BatteryFull,
  Fan,
  Wifi,
  Clock,
  Zap,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Leaf,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  currentReadings,
  temperatureHistory,
  energyHistory,
  recentActivities,
} from "../data/mockSensorData";

// Reusable metric card
function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  iconColor,
  iconBg,
  status,
  statusColor,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="mt-3 flex items-baseline gap-1">
            <h3 className="text-3xl font-bold tracking-tight text-gray-800">
              {value}
            </h3>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
        </div>

        <div className={`rounded-xl p-3 ${iconBg}`}>
          <Icon size={22} className={iconColor} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">{subtitle}</span>

        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

// Reusable chart card
function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

// Overview page
function Overview() {
  const readings = currentReadings;

  const activities = recentActivities;

  const getActivityIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={18} className="text-emerald-500" />;
      case "warning":
        return <AlertTriangle size={18} className="text-orange-500" />;
      default:
        return <Info size={18} className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-7">

      {/* Welcome section */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>

          <h1 className="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">
            Good afternoon!
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Here's an overview of your EcoCool Node system.
          </p>
        </div>

        {/* Device connection */}
        <div className="flex items-center gap-3 self-start rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 sm:self-auto">
          <div className="relative">
            <Wifi size={20} className="text-emerald-600" />
            <span className="absolute -right-1 -top-1 h-2.0 w-2.5 rounded-full border-2 border-emerald-50 bg-emerald-500" />
          </div>

          <div>
            <p className="text-sm font-semibold text-emerald-800">
              Device Online
            </p>
            <p className="text-xs text-emerald-600">
              {readings.deviceStatus} · Demo data
            </p>
          </div>
        </div>
      </section>

      {/* Environmental metrics */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Environmental Conditions
            </h2>
            <p className="text-xs text-gray-400">
              Current readings inside the growing enclosure
            </p>
          </div>

          <span className="hidden items-center gap-1 text-xs text-gray-400 sm:flex">
            <Clock size={13} />
            Updated {readings.lastUpdated}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            title="Temperature"
            value={readings.temperature}
            unit="°C"
            icon={Thermometer}
            iconColor="text-orange-600"
            iconBg="bg-orange-50"
            status="High"
            statusColor="bg-orange-50 text-orange-600"
            subtitle="Upper limit: 35°C"
          />

          <MetricCard
            title="Humidity"
            value={readings.humidity}
            unit="%"
            icon={Droplets}
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
            status="Monitoring"
            statusColor="bg-blue-50 text-blue-600"
            subtitle="Relative humidity"
          />

          <MetricCard
            title="Light Intensity"
            value={readings.lightIntensity.toLocaleString()}
            unit="lux"
            icon={Sun}
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
            status="Daylight"
            statusColor="bg-amber-50 text-amber-600"
            subtitle="Ambient light level"
          />

          <MetricCard
            title="Battery Level"
            value={readings.batteryLevel}
            unit="%"
            icon={BatteryFull}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
            status="Sufficient"
            statusColor="bg-emerald-50 text-emerald-600"
            subtitle={`${readings.batteryVoltage} V battery voltage`}
          />

        </div>
      </section>

      {/* Ventilation and energy overview */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            System Overview
          </h2>
          <p className="text-xs text-gray-400">
            Current ventilation operation and energy status
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Fan status card */}
          <div className="rounded-2xl bg-[#123D32] p-6 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-100/70">
                  Ventilation System
                </p>
                <h3 className="mt-1 text-xl font-bold">
                  Fan {readings.fanStatus}
                </h3>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <Fan size={27} className="text-[#58D6B4]" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-green-100/60">Fan Speed</p>
                <p className="mt-1 text-2xl font-bold">
                  {readings.fanSpeed}%
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-green-100/60">Power Usage</p>
                <p className="mt-1 text-2xl font-bold">
                  {readings.fanPower} W
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-xl bg-white/10 p-3">
              <Activity size={17} className="mt-0.5 shrink-0 text-[#58D6B4]" />
              <p className="text-xs leading-relaxed text-green-50/80">
                The fan is operating because the temperature is approaching
                the configured upper thermal limit.
              </p>
            </div>
          </div>

          {/* Energy status card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Energy Management</p>
                <h3 className="mt-1 text-xl font-bold text-gray-800">
                  Power Overview
                </h3>
              </div>

              <div className="rounded-xl bg-amber-50 p-3">
                <Zap size={25} className="text-amber-600" />
              </div>
            </div>

            <div className="mt-6 space-y-5">

              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-gray-500">
                    Solar Generation
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {readings.solarPower} W
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: "72%" }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-gray-500">
                    Fan Power Consumption
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {readings.fanPower} W
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#36B99A]"
                    style={{ width: "32%" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">Battery Voltage</p>
                  <p className="mt-1 text-lg font-bold text-gray-800">
                    {readings.batteryVoltage} V
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">Battery Level</p>
                  <p className="mt-1 text-lg font-bold text-gray-800">
                    {readings.batteryLevel}%
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Active control strategy */}
      <section className="rounded-2xl border border-[#B8E8D9] bg-[#EFFAF5] p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-3">
              <Activity size={23} className="text-[#23866C]" />
            </div>

            <div>
              <p className="text-xs font-medium text-[#23866C]">
                ACTIVE CONTROL STRATEGY
              </p>
              <h3 className="mt-1 text-lg font-bold text-gray-800">
                {readings.controlMethod} — Adaptive Control
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Considering temperature trends and battery availability.
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            Active
          </span>
        </div>
      </section>

      {/* Charts */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            Performance Monitoring
          </h2>
          <p className="text-xs text-gray-400">
            Historical environmental and energy readings
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

          {/* Temperature chart */}
          <ChartCard
            title="Temperature Trend"
            subtitle="Environmental temperature throughout the day"
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={temperatureHistory}>
                <defs>
                  <linearGradient
                    id="temperatureGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  domain={[20, 40]}
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  unit="°"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="#F59E0B"
                  strokeWidth={2.5}
                  fill="url(#temperatureGradient)"
                  name="Temperature"
                  unit="°C"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Energy chart */}
          <ChartCard
            title="Solar Generation vs Consumption"
            subtitle="Power generation and system consumption (W)"
          >
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={energyHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

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
                  unit="W"
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="solar"
                  stroke="#F59E0B"
                  strokeWidth={2.5}
                  dot={false}
                  name="Solar Generation"
                />

                <Line
                  type="monotone"
                  dataKey="consumption"
                  stroke="#36B99A"
                  strokeWidth={2.5}
                  dot={false}
                  name="Consumption"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

        </div>
      </section>

      {/* Recent activities */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Recent Activities
            </h2>
            <p className="text-xs text-gray-400">
              Latest system events and control decisions
            </p>
          </div>

          <button className="text-xs font-semibold text-[#23866C] hover:underline">
            View all
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <div className="mt-0.5 rounded-full bg-gray-50 p-2">
                {getActivityIcon(activity.type)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {activity.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  {activity.description}
                </p>
              </div>

              <span className="shrink-0 text-xs text-gray-400">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Demo mode notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <Info size={18} className="mt-0.5 shrink-0 text-blue-600" />
        <div>
          <p className="text-sm font-semibold text-blue-800">
            Demonstration Mode
          </p>
          <p className="mt-1 text-xs leading-relaxed text-blue-700">
            This dashboard currently displays simulated readings for
            demonstration purposes. Actual sensor data will be available
            after ESP32 integration.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Overview;
