
import { useMemo, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Activity,
  Battery,
  Bell,
  CheckCircle2,
  CircleAlert,
  Download,
  Search,
  ShieldCheck,
  Sun,
  Thermometer,
  Wifi,
  Zap,
} from "lucide-react";

// ---------------------------------------------
// DEMONSTRATION DATA
// ---------------------------------------------

const initialAlerts = [
  {
    id: 1,
    title: "High Temperature Detected",
    description:
      "Temperature reached 34.5°C, exceeding the configured threshold of 32°C.",
    severity: "Critical",
    category: "Temperature",
    status: "Active",
    time: "2026-11-02 14:30",
  },
  {
    id: 2,
    title: "Battery Level Low",
    description:
      "Battery level dropped below the configured reserve threshold.",
    severity: "Warning",
    category: "Energy",
    status: "Active",
    time: "2026-11-02 13:45",
  },
  {
    id: 3,
    title: "Solar Generation Reduced",
    description:
      "Solar power generation decreased due to reduced sunlight.",
    severity: "Warning",
    category: "Energy",
    status: "Acknowledged",
    time: "2026-11-02 12:20",
  },
  {
    id: 4,
    title: "Temperature Sensor Reconnected",
    description:
      "Environmental sensor connection was restored successfully.",
    severity: "Info",
    category: "Sensor",
    status: "Resolved",
    time: "2026-11-02 11:15",
  },
  {
    id: 5,
    title: "Fan Activated",
    description:
      "Ventilation fan was activated after the temperature threshold was reached.",
    severity: "Info",
    category: "Ventilation",
    status: "Resolved",
    time: "2026-11-02 10:30",
  },
  {
    id: 6,
    title: "Sensor Reading Unavailable",
    description:
      "A temporary communication issue prevented the system from receiving sensor readings.",
    severity: "Critical",
    category: "Sensor",
    status: "Resolved",
    time: "2026-11-01 16:40",
  },
];

const initialLogs = [
  {
    id: 1,
    time: "14:30:12",
    date: "2026-11-02",
    category: "Temperature",
    event: "High temperature detected",
    details: "Temperature: 34.5°C",
    type: "warning",
  },
  {
    id: 2,
    time: "14:30:15",
    date: "2026-11-02",
    category: "Ventilation",
    event: "Fan activated",
    details: "Fan speed adjusted to 75%",
    type: "success",
  },
  {
    id: 3,
    time: "14:25:10",
    date: "2026-11-02",
    category: "Control",
    event: "Adaptive control decision",
    details: "Method C selected ventilation based on temperature and energy conditions.",
    type: "info",
  },
  {
    id: 4,
    time: "13:45:22",
    date: "2026-11-02",
    category: "Energy",
    event: "Battery reserve warning",
    details: "Battery level: 28%",
    type: "warning",
  },
  {
    id: 5,
    time: "13:30:05",
    date: "2026-11-02",
    category: "Sensor",
    event: "Environmental readings received",
    details: "Temperature: 33.2°C | Humidity: 68%",
    type: "success",
  },
  {
    id: 6,
    time: "12:20:18",
    date: "2026-11-02",
    category: "Energy",
    event: "Solar generation reduced",
    details: "Solar power: 8.5 W",
    type: "warning",
  },
  {
    id: 7,
    time: "11:15:30",
    date: "2026-11-02",
    category: "System",
    event: "Device connected",
    details: "ESP32 communication restored.",
    type: "success",
  },
  {
    id: 8,
    time: "10:15:00",
    date: "2026-11-02",
    category: "Control",
    event: "Control method updated",
    details: "Selected control strategy: Method C",
    type: "info",
  },
];

// ---------------------------------------------
// REUSABLE COMPONENTS
// ---------------------------------------------

function SummaryCard({ title, value, description, icon: Icon, color }) {
  const colors = {
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className={`rounded-xl p-2.5 ${colors[color]}`}>
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-4 text-3xl font-bold text-gray-800">{value}</p>
      <p className="mt-2 text-xs text-gray-400">{description}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-red-50 text-red-700",
    Acknowledged: "bg-amber-50 text-amber-700",
    Resolved: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    Critical: "bg-red-50 text-red-700",
    Warning: "bg-amber-50 text-amber-700",
    Info: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${styles[severity]}`}
    >
      {severity === "Critical" && <AlertCircle size={12} />}
      {severity === "Warning" && <AlertTriangle size={12} />}
      {severity === "Info" && <Bell size={12} />}
      {severity}
    </span>
  );
}

function LogTypeIcon({ type }) {
  if (type === "warning") {
    return <AlertTriangle size={17} className="text-amber-600" />;
  }

  if (type === "success") {
    return <CheckCircle2 size={17} className="text-emerald-600" />;
  }

  return <CircleAlert size={17} className="text-blue-600" />;
}

// ---------------------------------------------
// MAIN PAGE
// ---------------------------------------------

export default function AlertsLogs() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [logs] = useState(initialLogs);

  const [alertSeverity, setAlertSeverity] = useState("All");
  const [alertStatus, setAlertStatus] = useState("All");
  const [logCategory, setLogCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // -------------------------------------------
  // SUMMARY COUNTS
  // -------------------------------------------

  const activeCount = alerts.filter(
    (alert) => alert.status === "Active"
  ).length;

  const criticalCount = alerts.filter(
    (alert) =>
      alert.severity === "Critical" && alert.status !== "Resolved"
  ).length;

  const resolvedCount = alerts.filter(
    (alert) => alert.status === "Resolved"
  ).length;

  // -------------------------------------------
  // FILTER ALERTS
  // -------------------------------------------

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSeverity =
        alertSeverity === "All" || alert.severity === alertSeverity;

      const matchesStatus =
        alertStatus === "All" || alert.status === alertStatus;

      const matchesSearch =
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSeverity && matchesStatus && matchesSearch;
    });
  }, [alerts, alertSeverity, alertStatus, searchTerm]);

  // -------------------------------------------
  // FILTER SYSTEM LOGS
  // -------------------------------------------

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesCategory =
        logCategory === "All" || log.category === logCategory;

      const matchesSearch =
        log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [logs, logCategory, searchTerm]);

  // -------------------------------------------
  // ALERT ACTIONS
  // -------------------------------------------

  const acknowledgeAlert = (id) => {
    setAlerts((previous) =>
      previous.map((alert) =>
        alert.id === id && alert.status === "Active"
          ? { ...alert, status: "Acknowledged" }
          : alert
      )
    );
  };

  const resolveAlert = (id) => {
    setAlerts((previous) =>
      previous.map((alert) =>
        alert.id === id
          ? { ...alert, status: "Resolved" }
          : alert
      )
    );
  };

  // -------------------------------------------
  // EXPORT LOGS
  // -------------------------------------------

  const exportLogs = () => {
    const headers = [
      "Date",
      "Time",
      "Category",
      "Event",
      "Details",
      "Type",
    ];

    const rows = filteredLogs.map((log) => [
      log.date,
      log.time,
      log.category,
      log.event,
      log.details,
      log.type,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecocool-system-logs.csv";
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
            Alerts & Logs
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor system notifications, faults and ventilation activities.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Demo Device Online
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Alerts"
          value={alerts.length}
          description="All recorded notifications"
          icon={Bell}
          color="blue"
        />

        <SummaryCard
          title="Active Alerts"
          value={activeCount}
          description="Require attention"
          icon={AlertCircle}
          color="red"
        />

        <SummaryCard
          title="Critical Alerts"
          value={criticalCount}
          description="Unresolved critical alerts"
          icon={AlertTriangle}
          color="amber"
        />

        <SummaryCard
          title="Resolved Alerts"
          value={resolvedCount}
          description="Successfully resolved"
          icon={ShieldCheck}
          color="green"
        />
      </div>

      {/* ALERT MANAGEMENT */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              System Alerts
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Review and manage abnormal system conditions.
            </p>
          </div>

          <span className="text-sm text-gray-400">
            {filteredAlerts.length} alert(s) found
          </span>
        </div>

        {/* ALERT FILTERS */}
        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search alerts and logs..."
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={alertSeverity}
            onChange={(event) => setAlertSeverity(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="Warning">Warning</option>
            <option value="Info">Info</option>
          </select>

          <select
            value={alertStatus}
            onChange={(event) => setAlertStatus(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Acknowledged">Acknowledged</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* ALERT LIST */}
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="rounded-xl bg-gray-50 px-4 py-10 text-center">
              <CheckCircle2
                size={30}
                className="mx-auto text-gray-300"
              />
              <p className="mt-3 text-sm font-medium text-gray-600">
                No matching alerts found
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Try changing your filters or search term.
              </p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="rounded-xl border border-gray-100 p-4 transition hover:border-gray-200"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div className="flex gap-3">
                    <div
                      className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        alert.severity === "Critical"
                          ? "bg-red-50 text-red-600"
                          : alert.severity === "Warning"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {alert.category === "Temperature" ? (
                        <Thermometer size={19} />
                      ) : alert.category === "Energy" ? (
                        <Zap size={19} />
                      ) : alert.category === "Sensor" ? (
                        <Wifi size={19} />
                      ) : (
                        <Bell size={19} />
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {alert.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {alert.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <SeverityBadge severity={alert.severity} />
                        <StatusBadge status={alert.status} />
                        <span className="text-xs text-gray-400">
                          {alert.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {alert.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ALERT ACTIONS */}
                  {alert.status !== "Resolved" && (
                    <div className="flex shrink-0 flex-wrap gap-2 lg:justify-end">
                      {alert.status === "Active" && (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                        >
                          Acknowledge
                        </button>
                      )}

                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-medium text-white transition hover:bg-emerald-800"
                      >
                        Mark Resolved
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* SYSTEM ACTIVITY LOGS */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              System Activity Logs
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              A chronological record of system events and control decisions.
            </p>
          </div>

          <button
            onClick={exportLogs}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <Download size={16} />
            Export Logs
          </button>
        </div>

        {/* LOG FILTER */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Filter by Category
          </label>

          <select
            value={logCategory}
            onChange={(event) => setLogCategory(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 sm:max-w-xs"
          >
            <option value="All">All Categories</option>
            <option value="Temperature">Temperature</option>
            <option value="Energy">Energy</option>
            <option value="Ventilation">Ventilation</option>
            <option value="Control">Control</option>
            <option value="Sensor">Sensor</option>
            <option value="System">System</option>
          </select>
        </div>

        {/* LOG TIMELINE */}
        {filteredLogs.length === 0 ? (
          <div className="rounded-xl bg-gray-50 px-4 py-10 text-center">
            <Search size={28} className="mx-auto text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">
              No matching activity logs found.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {filteredLogs.map((log, index) => (
              <div key={log.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50">
                    <LogTypeIcon type={log.type} />
                  </div>

                  {index !== filteredLogs.length - 1 && (
                    <div className="my-1 w-px flex-1 bg-gray-100" />
                  )}
                </div>

                <div className="min-w-0 flex-1 pb-6">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {log.event}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {log.details}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-gray-400">
                      {log.date} · {log.time}
                    </span>
                  </div>

                  <span className="mt-2 inline-block rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500">
                    {log.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ALERT RULE REFERENCE */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Alert Monitoring Categories
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Examples of conditions that the system should monitor.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Temperature",
              description:
                "Detect temperatures exceeding the configured safety limit.",
              icon: Thermometer,
            },
            {
              title: "Battery",
              description:
                "Monitor low battery reserves and abnormal voltage readings.",
              icon: Battery,
            },
            {
              title: "Solar Generation",
              description:
                "Identify unexpectedly low solar power generation.",
              icon: Sun,
            },
            {
              title: "Sensor",
              description:
                "Detect missing, invalid or unavailable sensor readings.",
              icon: Wifi,
            },
            {
              title: "Ventilation",
              description:
                "Record fan activation, deactivation and operating faults.",
              icon: Zap,
            },
            {
              title: "Device Connection",
              description:
                "Monitor ESP32 connectivity and communication failures.",
              icon: Activity,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex gap-3 rounded-xl bg-gray-50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
