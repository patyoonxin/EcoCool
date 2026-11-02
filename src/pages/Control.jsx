
import { useState } from "react";

import {
  Settings2,
  Thermometer,
  BatteryCharging,
  Fan,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Save,
  Activity,
  Lock,
} from "lucide-react";

// ======================================
// DEMO DEVICE READINGS
// ======================================

const demoReadings = {
  temperature: 34.5,
  batteryLevel: 72,
  fanStatus: "ON",
  fanSpeed: 75,
};

// ======================================
// CONTROL METHODS
// ======================================

const controlMethods = [
  {
    id: "A",
    name: "Fixed Temperature Control",
    shortName: "Method A",
    description:
      "Activates ventilation when the temperature reaches the configured threshold.",
    details:
      "A baseline strategy that considers temperature without adapting to battery availability.",
    icon: Thermometer,
  },
  {
    id: "B",
    name: "Temperature + Battery Control",
    shortName: "Method B",
    description:
      "Considers both temperature and battery availability before operating the fan.",
    details:
      "Helps reduce energy consumption by considering the available battery reserve.",
    icon: BatteryCharging,
  },
  {
    id: "C",
    name: "Adaptive Energy-Aware Control",
    shortName: "Method C",
    description:
      "Adapts ventilation decisions based on temperature trends and available energy.",
    details:
      "The proposed strategy considers changing environmental conditions and energy availability.",
    icon: Activity,
  },
];

const defaultSettings = {
  controlMethod: "C",
  temperatureThreshold: 32,
  batteryReserve: 30,
  fanSpeed: 75,
  hysteresis: 2,
  safetyTemperature: 38,
};

// ======================================
// REUSABLE SETTING CARD
// ======================================

function SettingCard({
  title,
  description,
  icon: Icon,
  children,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-start gap-3 mb-5">
        <div className="p-2.5 bg-green-50 rounded-xl">
          <Icon size={20} className="text-green-700" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-400 mt-1">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

// ======================================
// RANGE SETTING
// ======================================

function RangeSetting({
  label,
  description,
  value,
  unit,
  min,
  max,
  step = 1,
  onChange,
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-gray-700">
            {label}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {description}
          </p>
        </div>

        <span className="text-lg font-bold text-gray-800">
          {value}{unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-green-600 cursor-pointer"
      />

      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

// ======================================
// MAIN CONTROL PAGE
// ======================================

export default function Control() {
  const [settings, setSettings] = useState(defaultSettings);
  const [savedSettings, setSavedSettings] = useState(defaultSettings);
  const [isSaved, setIsSaved] = useState(true);

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setIsSaved(false);
  };

  const selectedMethod = controlMethods.find(
    (method) => method.id === settings.controlMethod
  );

  const temperatureReached =
    demoReadings.temperature >= settings.temperatureThreshold;

  const highTemperature =
    demoReadings.temperature >= settings.safetyTemperature;

  const batteryLow =
    demoReadings.batteryLevel <= settings.batteryReserve;

  const fanRequested = temperatureReached || highTemperature;

  const controlDecision = highTemperature
    ? "High-temperature safety override requested"
    : temperatureReached
    ? "Ventilation requested"
    : "Ventilation not required";

  const resetSettings = () => {
    setSettings(defaultSettings);
    setSavedSettings(defaultSettings);
    setIsSaved(true);
  };

  const applySettings = () => {
    setSavedSettings({ ...settings });
    setIsSaved(true);
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Control & Configuration
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Configure ventilation strategies and energy management settings.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white border border-gray-100 rounded-lg px-3 py-2 w-fit">
          <Settings2 size={15} />
          Demo Configuration
        </div>
      </div>

      {/* CURRENT DEVICE STATUS */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-4">
          Current Device Status
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Temperature</p>
              <Thermometer className="text-orange-500" size={21} />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-2">
              {demoReadings.temperature}°C
            </h3>

            <p className="text-xs text-gray-400 mt-2">
              Current demo reading
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Battery Level</p>
              <BatteryCharging className="text-green-600" size={21} />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-2">
              {demoReadings.batteryLevel}%
            </h3>

            <p className="text-xs text-gray-400 mt-2">
              Current demo reading
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Fan Status</p>
              <Fan className="text-teal-600" size={21} />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-2">
              {demoReadings.fanStatus}
            </h3>

            <p className="text-xs text-gray-400 mt-2">
              Demo speed: {demoReadings.fanSpeed}%
            </p>
          </div>

        </div>
      </section>

      {/* CONTROL METHOD SELECTION */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold text-gray-800">
            Ventilation Control Strategy
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Select the control method used by the system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {controlMethods.map((method) => {
            const Icon = method.icon;
            const isActive = settings.controlMethod === method.id;

            return (
              <button
                key={method.id}
                type="button"
                onClick={() =>
                  updateSetting("controlMethod", method.id)
                }
                className={`text-left rounded-2xl border-2 p-5 transition-all ${
                  isActive
                    ? "border-green-600 bg-green-50"
                    : "border-gray-100 bg-white hover:border-green-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    isActive ? "bg-green-100" : "bg-gray-100"
                  }`}>
                    <Icon
                      size={22}
                      className={
                        isActive ? "text-green-700" : "text-gray-500"
                      }
                    />
                  </div>

                  {isActive && (
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-gray-400">
                  METHOD {method.id}
                </p>

                <h3 className="font-semibold text-gray-800 mt-1">
                  {method.name}
                </h3>

                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  {method.description}
                </p>

                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  {method.details}
                </p>
              </button>
            );
          })}

        </div>
      </section>

      {/* ACTIVE STRATEGY */}
      <section className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="text-green-700" size={20} />

          <h2 className="font-semibold text-gray-800">
            Active Control Strategy
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-green-700">
              METHOD {selectedMethod.id}
            </span>

            <h3 className="text-lg font-bold text-gray-800 mt-1">
              {selectedMethod.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {selectedMethod.details}
            </p>
          </div>

          <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-2 rounded-lg w-fit">
            Selected Strategy
          </span>
        </div>
      </section>

      {/* OPERATING CONFIGURATION */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-4">
          Operating Configuration
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

          <SettingCard
            title="Temperature Configuration"
            description="Configure the normal ventilation operating threshold."
            icon={Thermometer}
          >
            <RangeSetting
              label="Temperature Threshold"
              description="Request ventilation at this temperature"
              value={settings.temperatureThreshold}
              unit="°C"
              min={25}
              max={38}
              onChange={(value) =>
                updateSetting("temperatureThreshold", value)
              }
            />

            <RangeSetting
              label="Hysteresis"
              description="Temperature difference before switching off"
              value={settings.hysteresis}
              unit="°C"
              min={0.5}
              max={5}
              step={0.5}
              onChange={(value) =>
                updateSetting("hysteresis", value)
              }
            />

            <div className="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
              <Info size={16} className="text-gray-500 mt-0.5" />

              <p className="text-xs text-gray-500 leading-relaxed">
                Hysteresis helps prevent frequent fan switching when
                temperature fluctuates around the threshold.
              </p>
            </div>
          </SettingCard>

          <SettingCard
            title="Energy Configuration"
            description="Configure battery protection and ventilation output."
            icon={Zap}
          >
            <RangeSetting
              label="Minimum Battery Reserve"
              description="Battery level reserved for system protection"
              value={settings.batteryReserve}
              unit="%"
              min={10}
              max={60}
              step={5}
              onChange={(value) =>
                updateSetting("batteryReserve", value)
              }
            />

            <RangeSetting
              label="Fan Speed"
              description="Configured fan output (if PWM is supported)"
              value={settings.fanSpeed}
              unit="%"
              min={30}
              max={100}
              step={5}
              onChange={(value) =>
                updateSetting("fanSpeed", value)
              }
            />
          </SettingCard>

        </div>
      </section>

      {/* SAFETY CONFIGURATION */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-4">
          Safety Configuration
        </h2>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-start gap-3 mb-5">
            <div className="p-2.5 bg-red-50 rounded-xl">
              <ShieldCheck className="text-red-600" size={21} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                Thermal Safety Override
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                High-temperature protection independent of the selected
                operating strategy.
              </p>
            </div>
          </div>

          <RangeSetting
            label="High Temperature Safety Limit"
            description="Triggers the configured high-temperature safety response"
            value={settings.safetyTemperature}
            unit="°C"
            min={35}
            max={45}
            onChange={(value) =>
              updateSetting("safetyTemperature", value)
            }
          />

          <div className="flex items-start gap-2 bg-red-50 rounded-xl p-3 mt-4">
            <Lock size={16} className="text-red-600 mt-0.5" />

            <p className="text-xs text-red-700 leading-relaxed">
              The ESP32 should enforce safety rules locally. The dashboard
              is only a configuration interface and must not override
              hardware-level protection.
            </p>
          </div>

        </div>
      </section>

      {/* CONTROL DECISION PREVIEW */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-4">
          Control Decision Preview
        </h2>

        <div className={`rounded-2xl border p-5 ${
          highTemperature
            ? "bg-red-50 border-red-100"
            : temperatureReached
            ? "bg-orange-50 border-orange-100"
            : "bg-green-50 border-green-100"
        }`}>
          <div className="flex items-center gap-2">
            {highTemperature ? (
              <AlertTriangle className="text-red-600" size={21} />
            ) : temperatureReached ? (
              <Activity className="text-orange-600" size={21} />
            ) : (
              <CheckCircle className="text-green-700" size={21} />
            )}

            <h3 className="font-semibold text-gray-800">
              {controlDecision}
            </h3>
          </div>

          <p className="text-sm text-gray-600 mt-3">
            Current temperature: {demoReadings.temperature}°C.
            Configured threshold: {settings.temperatureThreshold}°C.
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Battery level: {demoReadings.batteryLevel}%.
            Minimum reserve: {settings.batteryReserve}%.
          </p>

          <p className="text-xs text-gray-500 mt-3">
            {batteryLow
              ? "Battery reserve condition is reached. The controller must apply its configured battery protection policy while preserving thermal safety."
              : fanRequested
              ? "The temperature condition requests ventilation. The selected strategy and local safety rules determine the final fan command."
              : "The temperature is below the configured operating threshold. Normal ventilation may remain off, subject to other control conditions."}
          </p>

          <p className="text-xs text-gray-400 mt-3">
            This is a simplified interface preview, not the actual
            Method A/B/C algorithm.
          </p>
        </div>
      </section>

      {/* APPLY / RESET SETTINGS */}
      <section className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h3 className="font-semibold text-gray-800">
              Configuration Changes
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              {isSaved
                ? "Your current demo settings have been applied locally."
                : "You have unapplied configuration changes."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              onClick={resetSettings}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type="button"
              onClick={applySettings}
              disabled={isSaved}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-700 text-white text-sm font-medium hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              Apply Settings
            </button>

          </div>
        </div>
      </section>


    </div>
  );
}
