
import { useState } from "react";
import {
  Activity,
  Bell,
  Check,
  ChevronRight,
  Clock,
  Cpu,
  Download,
  Info,
  RefreshCw,
  Save,
  Server,
  Settings as SettingsIcon,
  ShieldCheck,
  Thermometer,
  Wifi,
  Wind,
  Zap,
} from "lucide-react";

// ---------------------------------------------
// DEFAULT SETTINGS
// ---------------------------------------------

const defaultSettings = {
  // Device information
  deviceName: "EcoCool Node - Unit 01",
  deviceId: "ECN-ESP32-001",
  location: "Growing Enclosure A",

  // Connection
  wifiName: "EcoCool_Demo_Network",
  serverUrl: "http://localhost:8000",

  // Sensors
  temperatureSensor: true,
  humiditySensor: true,
  lightSensor: true,
  energySensor: true,

  // Data collection
  samplingInterval: 5,
  uploadInterval: 30,

  // Alert thresholds
  highTemperature: 35,
  lowBattery: 30,

  // Notifications
  temperatureAlerts: true,
  batteryAlerts: true,
  sensorAlerts: true,
  connectionAlerts: true,

  // System
  autoReconnect: true,
  dataLogging: true,
};

const Section = ({ icon: Icon, title, description, children }) => (
  <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
    <div className="flex items-start gap-3 border-b border-gray-100 px-5 py-5 sm:px-6">
      <div className="rounded-xl bg-emerald-50 p-2.5">
        <Icon size={20} className="text-emerald-700" />
      </div>
      <div>
        <h2 className="font-semibold text-gray-800">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>

    <div className="space-y-5 p-5 sm:p-6">{children}</div>
  </section>
);

const Field = ({ label, description, children }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
    {description && (
      <p className="mt-1.5 text-xs text-gray-400">{description}</p>
    )}
  </div>
);

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {description && (
          <p className="mt-1 text-xs text-gray-400">{description}</p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-emerald-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

// ---------------------------------------------
// MAIN PAGE
// ---------------------------------------------

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [savedSettings, setSavedSettings] = useState(defaultSettings);
  const [saveMessage, setSaveMessage] = useState("");

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaveMessage("");
  };

  const handleSave = () => {
    setSavedSettings({ ...settings });
    setSaveMessage("Settings saved in this demo session.");
  };

  const handleReset = () => {
    setSettings({ ...savedSettings });
    setSaveMessage("Unsaved changes have been discarded.");
  };

  const handleRestoreDefaults = () => {
    setSettings({ ...defaultSettings });
    setSaveMessage("Default settings restored. Click Save to apply.");
  };

  const handleExport = () => {
    const blob = new Blob(
      [JSON.stringify(settings, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecocool-node-settings.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(savedSettings);

  return (
    <div className="space-y-7">
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            System Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure your EcoCool Node device, sensors and system preferences.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Download size={17} />
          Export Configuration
        </button>
      </div>

      {/* DEVICE STATUS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Device Status</p>
            <Cpu size={19} className="text-emerald-700" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-gray-800">Online (Demo)</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">Simulated connection state</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Firmware Version</p>
            <Activity size={19} className="text-emerald-700" />
          </div>
          <p className="mt-3 font-semibold text-gray-800">v1.0.0-demo</p>
          <p className="mt-1 text-xs text-gray-400">Illustrative version</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Configuration</p>
            <ShieldCheck size={19} className="text-emerald-700" />
          </div>
          <p className="mt-3 font-semibold text-gray-800">
            {hasChanges ? "Unsaved Changes" : "Up to Date"}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {hasChanges ? "Review and save your changes" : "Matches saved demo state"}
          </p>
        </div>
      </div>

      {/* DEVICE INFORMATION */}
      <Section
        icon={Cpu}
        title="Device Information"
        description="Manage the identity and location of your EcoCool Node device."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Device Name">
            <input
              className={inputClass}
              value={settings.deviceName}
              onChange={(e) => updateSetting("deviceName", e.target.value)}
            />
          </Field>

          <Field label="Device ID" description="Unique identifier for this device.">
            <input
              className={`${inputClass} bg-gray-50`}
              value={settings.deviceId}
              readOnly
            />
          </Field>

          <Field label="Growing Enclosure / Location">
            <input
              className={inputClass}
              value={settings.location}
              onChange={(e) => updateSetting("location", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      {/* CONNECTION SETTINGS */}
      <Section
        icon={Wifi}
        title="Connection Settings"
        description="Configure the network and backend connection details."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Wi-Fi Network Name (SSID)">
            <input
              className={inputClass}
              value={settings.wifiName}
              onChange={(e) => updateSetting("wifiName", e.target.value)}
            />
          </Field>

          <Field
            label="Backend API URL"
            description="Address used by the dashboard to communicate with FastAPI."
          >
            <input
              className={inputClass}
              value={settings.serverUrl}
              onChange={(e) => updateSetting("serverUrl", e.target.value)}
            />
          </Field>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server size={17} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Connection Status
              </span>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              Demo Connected
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            This is a placeholder status. Actual connection monitoring will be
            implemented with the ESP32 and FastAPI backend.
          </p>
        </div>

        <Toggle
          label="Automatic Reconnection"
          description="Allow the device to reconnect after a network interruption."
          checked={settings.autoReconnect}
          onChange={(value) => updateSetting("autoReconnect", value)}
        />
      </Section>

      {/* SENSOR CONFIGURATION */}
      <Section
        icon={Thermometer}
        title="Sensor Configuration"
        description="Select which sensors are enabled for environmental and energy monitoring."
      >
        <div className="divide-y divide-gray-100">
          <Toggle
            label="Temperature Sensor"
            description="Monitor enclosure temperature (e.g. SHT31 or DHT22)."
            checked={settings.temperatureSensor}
            onChange={(value) => updateSetting("temperatureSensor", value)}
          />

          <Toggle
            label="Humidity Sensor"
            description="Monitor relative humidity inside the enclosure."
            checked={settings.humiditySensor}
            onChange={(value) => updateSetting("humiditySensor", value)}
          />

          <Toggle
            label="Light Intensity Sensor"
            description="Measure ambient light intensity (e.g. BH1750)."
            checked={settings.lightSensor}
            onChange={(value) => updateSetting("lightSensor", value)}
          />

          <Toggle
            label="Energy Monitoring Sensor"
            description="Monitor electrical voltage and current using a compatible sensor."
            checked={settings.energySensor}
            onChange={(value) => updateSetting("energySensor", value)}
          />
        </div>
      </Section>

      {/* DATA COLLECTION */}
      <Section
        icon={Clock}
        title="Data Collection Settings"
        description="Configure how frequently sensor readings are collected and uploaded."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field
            label="Sensor Sampling Interval"
            description="How often the ESP32 reads the sensors."
          >
            <select
              className={inputClass}
              value={settings.samplingInterval}
              onChange={(e) =>
                updateSetting("samplingInterval", Number(e.target.value))
              }
            >
              <option value={1}>1 second</option>
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
            </select>
          </Field>

          <Field
            label="Data Upload Interval"
            description="How often readings are sent to the backend."
          >
            <select
              className={inputClass}
              value={settings.uploadInterval}
              onChange={(e) =>
                updateSetting("uploadInterval", Number(e.target.value))
              }
            >
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
              <option value={300}>5 minutes</option>
            </select>
          </Field>
        </div>

        <Toggle
          label="Enable Data Logging"
          description="Store sensor readings and system events for historical analysis."
          checked={settings.dataLogging}
          onChange={(value) => updateSetting("dataLogging", value)}
        />
      </Section>

      {/* ALERT THRESHOLDS */}
      <Section
        icon={Bell}
        title="Alert Thresholds"
        description="Set the values that trigger dashboard warning notifications."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field
            label="High Temperature Alert (°C)"
            description="Generate a warning when temperature reaches this value."
          >
            <input
              type="number"
              min="0"
              max="80"
              className={inputClass}
              value={settings.highTemperature}
              onChange={(e) =>
                updateSetting("highTemperature", Number(e.target.value))
              }
            />
          </Field>

          <Field
            label="Low Battery Alert (%)"
            description="Generate a warning when battery level falls below this value."
          >
            <input
              type="number"
              min="0"
              max="100"
              className={inputClass}
              value={settings.lowBattery}
              onChange={(e) =>
                updateSetting("lowBattery", Number(e.target.value))
              }
            />
          </Field>
        </div>

        <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
          These are notification thresholds, not replacements for the ESP32's
          independent thermal safety override or battery protection limits.
        </p>
      </Section>

      {/* NOTIFICATION PREFERENCES */}
      <Section
        icon={Bell}
        title="Notification Preferences"
        description="Choose which system events should generate alerts."
      >
        <div className="divide-y divide-gray-100">
          <Toggle
            label="High Temperature Alerts"
            description="Notify when the enclosure becomes too hot."
            checked={settings.temperatureAlerts}
            onChange={(value) => updateSetting("temperatureAlerts", value)}
          />

          <Toggle
            label="Low Battery Alerts"
            description="Notify when battery level drops below the configured threshold."
            checked={settings.batteryAlerts}
            onChange={(value) => updateSetting("batteryAlerts", value)}
          />

          <Toggle
            label="Sensor Error Alerts"
            description="Notify when a sensor stops responding or returns invalid readings."
            checked={settings.sensorAlerts}
            onChange={(value) => updateSetting("sensorAlerts", value)}
          />

          <Toggle
            label="Connection Alerts"
            description="Notify when the device loses its backend or Wi-Fi connection."
            checked={settings.connectionAlerts}
            onChange={(value) => updateSetting("connectionAlerts", value)}
          />
        </div>
      </Section>

      {/* SYSTEM MAINTENANCE */}
      <Section
        icon={SettingsIcon}
        title="System Maintenance"
        description="View system information and manage configuration maintenance."
      >
        <div className="divide-y divide-gray-100">
          <div className="flex items-center justify-between gap-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Firmware Version
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Current demonstration firmware
              </p>
            </div>
            <span className="text-sm font-medium text-gray-600">
              v1.0.0-demo
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Hardware Platform
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Target microcontroller
              </p>
            </div>
            <span className="text-sm font-medium text-gray-600">
              ESP32
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Configuration Backup
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Download the current configuration as JSON.
              </p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
            >
              <Download size={15} />
              Export
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Restore Default Settings
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Reset all configuration fields to their initial values.
              </p>
            </div>
            <button
              onClick={handleRestoreDefaults}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
            >
              <RefreshCw size={15} />
              Restore
            </button>
          </div>
        </div>
      </Section>

      {/* SAVE ACTIONS */}
      <div className="sticky bottom-4 z-10 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {hasChanges ? "You have unsaved changes" : "All changes saved"}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Review your configuration before saving.
            </p>

            {saveMessage && (
              <p className="mt-1 text-xs font-medium text-emerald-700">
                {saveMessage}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleReset}
              disabled={!hasChanges}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Discard
            </button>

            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
