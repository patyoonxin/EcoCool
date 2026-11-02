
import { useMemo, useState } from "react";
import {
  Activity,
  Battery,
  Clock,
  Download,
  FlaskConical,
  Play,
  Square,
  Sun,
  Thermometer,
  Wind,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ---------------------------------------------
// DEMO DATA
// ---------------------------------------------

const initialExperiments = [
  {
    id: 1,
    name: "High Temperature Test",
    method: "A",
    condition: "Hot and Sunny",
    duration: 120,
    energy: 42,
    exposure: 35,
    endurance: 8.5,
    fanTime: 95,
    solarUtilization: 68,
    date: "2026-10-28",
    status: "Completed",
  },
  {
    id: 2,
    name: "Low Battery Test",
    method: "B",
    condition: "Low Battery",
    duration: 120,
    energy: 31,
    exposure: 48,
    endurance: 10.2,
    fanTime: 72,
    solarUtilization: 74,
    date: "2026-10-29",
    status: "Completed",
  },
  {
    id: 3,
    name: "Adaptive Control Test",
    method: "C",
    condition: "Variable Solar",
    duration: 120,
    energy: 27,
    exposure: 22,
    endurance: 12.4,
    fanTime: 65,
    solarUtilization: 86,
    date: "2026-10-30",
    status: "Completed",
  },
];

const methods = [
  {
    id: "A",
    name: "Fixed Temperature Control",
    description:
      "Activates ventilation when temperature reaches a fixed threshold.",
  },
  {
    id: "B",
    name: "Temperature + Battery Control",
    description:
      "Considers temperature and minimum battery reserve before operating the fan.",
  },
  {
    id: "C",
    name: "Adaptive Energy-Aware Control",
    description:
      "Adjusts ventilation decisions according to temperature trends and available energy.",
  },
];

const conditions = [
  "Hot and Sunny",
  "Hot and Low Solar",
  "Low Battery",
  "Variable Solar",
  "Normal Conditions",
];

const methodDemoResults = {
  A: {
    energy: 42,
    exposure: 35,
    endurance: 8.5,
    fanTime: 95,
    solarUtilization: 68,
  },
  B: {
    energy: 31,
    exposure: 48,
    endurance: 10.2,
    fanTime: 72,
    solarUtilization: 74,
  },
  C: {
    energy: 27,
    exposure: 22,
    endurance: 12.4,
    fanTime: 65,
    solarUtilization: 86,
  },
};

// ---------------------------------------------
// REUSABLE COMPONENTS
// ---------------------------------------------

function MetricCard({ title, value, unit, icon: Icon, description }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="rounded-xl bg-emerald-50 p-2.5">
          <Icon size={19} className="text-emerald-700" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>

      <p className="mt-2 text-xs text-gray-400">{description}</p>
    </div>
  );
}

function SectionHeader({ title, description }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}

// ---------------------------------------------
// MAIN PAGE
// ---------------------------------------------

export default function Experiments() {
  const [experiments, setExperiments] = useState(initialExperiments);

  const [form, setForm] = useState({
    name: "",
    method: "A",
    duration: 120,
    condition: "Hot and Sunny",
  });

  const [runningExperiment, setRunningExperiment] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("energy");

  const completedExperiments = experiments.filter(
    (experiment) => experiment.status === "Completed"
  );

  const latestExperiment = completedExperiments[0];

  const comparisonData = useMemo(() => {
    return ["A", "B", "C"].map((method) => {
      const records = completedExperiments.filter(
        (experiment) => experiment.method === method
      );

      if (records.length === 0) {
        return {
          method: `Method ${method}`,
          energy: 0,
          exposure: 0,
          endurance: 0,
          fanTime: 0,
          solarUtilization: 0,
        };
      }

      const average = (key) =>
        Number(
          (
            records.reduce((sum, record) => sum + record[key], 0) /
            records.length
          ).toFixed(1)
        );

      return {
        method: `Method ${method}`,
        energy: average("energy"),
        exposure: average("exposure"),
        endurance: average("endurance"),
        fanTime: average("fanTime"),
        solarUtilization: average("solarUtilization"),
      };
    });
  }, [completedExperiments]);

  const metricOptions = [
    { value: "energy", label: "Energy Consumption", unit: "Wh" },
    { value: "exposure", label: "Temperature Exposure", unit: "°C·min" },
    { value: "endurance", label: "Battery Endurance", unit: "hours" },
    { value: "fanTime", label: "Fan Operating Time", unit: "min" },
    {
      value: "solarUtilization",
      label: "Solar Energy Utilisation",
      unit: "%",
    },
  ];

  const activeMetric = metricOptions.find(
    (metric) => metric.value === selectedMetric
  );

  // -------------------------------------------
  // EXPERIMENT ACTIONS
  // -------------------------------------------

  const handleStart = () => {
    if (runningExperiment) return;

    const newExperiment = {
      ...form,
      id: Date.now(),
      name: form.name.trim() || `Experiment ${experiments.length + 1}`,
      status: "Running",
      startTime: new Date(),
    };

    setRunningExperiment(newExperiment);
    setExperiments((previous) => [newExperiment, ...previous]);
  };

  const handleStop = () => {
    if (!runningExperiment) return;

    const result = methodDemoResults[runningExperiment.method];

    // These are illustrative values, not measured hardware results.
    const newRecord = {
      ...runningExperiment,
      ...result,
      date: new Date().toISOString().slice(0, 10),
      status: "Completed",
    };

    setExperiments((previous) =>
      previous.map((experiment) =>
        experiment.id === runningExperiment.id ? newRecord : experiment
      )
    );

    setRunningExperiment(null);
    setForm((previous) => ({
      ...previous,
      name: "",
    }));
  };

  const handleExport = () => {
    const headers = [
      "Experiment",
      "Method",
      "Condition",
      "Duration (min)",
      "Energy (Wh)",
      "Temperature Exposure (°C·min)",
      "Battery Endurance (hours)",
      "Fan Operating Time (min)",
      "Solar Utilisation (%)",
      "Date",
      "Status",
    ];

    const rows = completedExperiments.map((experiment) => [
      experiment.name,
      `Method ${experiment.method}`,
      experiment.condition,
      experiment.duration,
      experiment.energy,
      experiment.exposure,
      experiment.endurance,
      experiment.fanTime,
      experiment.solarUtilization,
      experiment.date,
      experiment.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecocool-experiment-results.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  // -------------------------------------------
  // PAGE UI
  // -------------------------------------------

  return (
    <div className="space-y-7">
      {/* PAGE INTRO */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Experiments & Performance
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Evaluate and compare the performance of different ventilation
            strategies.
          </p>
        </div>

        <button
          onClick={handleExport}
          disabled={completedExperiments.length === 0}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={17} />
          Export Results
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Experiments"
          value={experiments.length}
          unit="records"
          icon={FlaskConical}
          description="Including the current experiment, if running"
        />
        <MetricCard
          title="Completed"
          value={completedExperiments.length}
          unit="tests"
          icon={Activity}
          description="Completed experiment records"
        />
        <MetricCard
          title="Latest Method"
          value={
            latestExperiment ? `Method ${latestExperiment.method}` : "--"
          }
          unit=""
          icon={Zap}
          description="Most recently completed record"
        />
        <MetricCard
          title="Latest Energy Use"
          value={latestExperiment?.energy ?? "--"}
          unit="Wh"
          icon={Battery}
          description="Illustrative energy consumption"
        />
      </div>

      {/* EXPERIMENT CONFIGURATION */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeader
          title="Experiment Configuration"
          description="Configure the conditions before starting a new test."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Experiment Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              placeholder="e.g. Afternoon Heat Test"
              disabled={!!runningExperiment}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Test Condition
            </label>
            <select
              value={form.condition}
              onChange={(event) =>
                setForm({ ...form, condition: event.target.value })
              }
              disabled={!!runningExperiment}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 disabled:bg-gray-50"
            >
              {conditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Control Method
            </label>
            <select
              value={form.method}
              onChange={(event) =>
                setForm({ ...form, method: event.target.value })
              }
              disabled={!!runningExperiment}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 disabled:bg-gray-50"
            >
              {methods.map((method) => (
                <option key={method.id} value={method.id}>
                  Method {method.id} — {method.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Experiment Duration
            </label>
            <select
              value={form.duration}
              onChange={(event) =>
                setForm({ ...form, duration: Number(event.target.value) })
              }
              disabled={!!runningExperiment}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 disabled:bg-gray-50"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={240}>4 hours</option>
              <option value={480}>8 hours</option>
            </select>
          </div>
        </div>

        {/* METHOD DESCRIPTION */}
        <div className="mt-5 rounded-xl bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-900">
            Method {form.method}:{" "}
            {methods.find((method) => method.id === form.method)?.name}
          </p>
          <p className="mt-1 text-sm text-emerald-800">
            {methods.find((method) => method.id === form.method)?.description}
          </p>
        </div>

        {/* START / STOP */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {runningExperiment ? (
              <>
                <p className="text-sm font-semibold text-emerald-700">
                  Experiment is running
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {runningExperiment.name} · Method {runningExperiment.method}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Ready to start a demonstration experiment.
              </p>
            )}
          </div>

          {runningExperiment ? (
            <button
              onClick={handleStop}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <Square size={16} />
              Stop Experiment
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <Play size={16} />
              Start Experiment
            </button>
          )}
        </div>
      </section>

      {/* PERFORMANCE COMPARISON */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeader
          title="Method Performance Comparison"
          description="Compare the average results of completed experiments for each control strategy."
        />

        <div className="mb-5 flex flex-wrap gap-2">
          {metricOptions.map((metric) => (
            <button
              key={metric.value}
              onClick={() => setSelectedMetric(metric.value)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                selectedMetric === metric.value
                  ? "bg-emerald-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 10, right: 15, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="method"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                unit={` ${activeMetric.unit}`}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [
                  `${value} ${activeMetric.unit}`,
                  activeMetric.label,
                ]}
              />
              <Legend />
              <Bar
                dataKey={selectedMetric}
                name={activeMetric.label}
                fill="#36B99A"
                radius={[6, 6, 0, 0]}
                maxBarSize={65}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Values are averages of completed records in the current demo dataset.
          A value of zero means no completed record is available for that method.
        </p>
      </section>

      {/* METRICS EXPLANATION */}
      <section>
        <SectionHeader
          title="Evaluation Metrics"
          description="The key measurements used to evaluate the effectiveness of each method."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <Zap className="text-emerald-700" size={19} />
              <h3 className="text-sm font-semibold text-gray-800">
                Energy Consumption
              </h3>
            </div>
            <p className="text-sm text-gray-500">
              Total electrical energy consumed by the system during the test,
              measured in watt-hours (Wh).
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <Thermometer className="text-emerald-700" size={19} />
              <h3 className="text-sm font-semibold text-gray-800">
                Temperature Exposure
              </h3>
            </div>
            <p className="text-sm text-gray-500">
              Cumulative temperature exposure above the configured upper
              temperature limit, measured in °C·min.
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <Battery className="text-emerald-700" size={19} />
              <h3 className="text-sm font-semibold text-gray-800">
                Battery Endurance
              </h3>
            </div>
            <p className="text-sm text-gray-500">
              Estimated operating duration under the tested energy conditions,
              measured in hours.
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <Wind className="text-emerald-700" size={19} />
              <h3 className="text-sm font-semibold text-gray-800">
                Fan Operating Time
              </h3>
            </div>
            <p className="text-sm text-gray-500">
              Total duration the ventilation fan operates during the
              experiment, measured in minutes.
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <Sun className="text-emerald-700" size={19} />
              <h3 className="text-sm font-semibold text-gray-800">
                Solar Utilisation
              </h3>
            </div>
            <p className="text-sm text-gray-500">
              The proportion of available solar energy used by the system,
              expressed as a percentage. Define the calculation consistently
              when implementing it.
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <Clock className="text-emerald-700" size={19} />
              <h3 className="text-sm font-semibold text-gray-800">
                Experiment Duration
              </h3>
            </div>
            <p className="text-sm text-gray-500">
              The total observation period for each test, used to compare
              results under consistent conditions.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIMENT HISTORY */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeader
          title="Experiment History"
          description="Review previous tests and their recorded performance."
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-500">
                <th className="px-3 py-3 font-medium">Experiment</th>
                <th className="px-3 py-3 font-medium">Method</th>
                <th className="px-3 py-3 font-medium">Condition</th>
                <th className="px-3 py-3 font-medium">Energy (Wh)</th>
                <th className="px-3 py-3 font-medium">Exposure (°C·min)</th>
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {experiments.map((experiment) => (
                <tr
                  key={experiment.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-3 py-4 font-medium text-gray-800">
                    {experiment.name}
                  </td>
                  <td className="px-3 py-4 text-gray-600">
                    Method {experiment.method}
                  </td>
                  <td className="px-3 py-4 text-gray-600">
                    {experiment.condition}
                  </td>
                  <td className="px-3 py-4 text-gray-600">
                    {experiment.energy ?? "--"}
                  </td>
                  <td className="px-3 py-4 text-gray-600">
                    {experiment.exposure ?? "--"}
                  </td>
                  <td className="px-3 py-4 text-gray-500">
                    {experiment.date || "In progress"}
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        experiment.status === "Running"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {experiment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
