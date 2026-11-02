
export const currentReadings = {
  temperature: 34.5,
  humidity: 68,
  lightIntensity: 12500,
  batteryLevel: 72,
  batteryVoltage: 12.4,
  solarPower: 18.0,
  fanPower: 8.0,
  fanSpeed: 75,
  fanStatus: "ON",
  controlMethod: "Method C",
  deviceStatus: "Online",
  lastUpdated: "Just now",
};

export const temperatureHistory = [
  { time: "8 AM", temperature: 27 },
  { time: "9 AM", temperature: 28 },
  { time: "10 AM", temperature: 30 },
  { time: "11 AM", temperature: 32 },
  { time: "12 PM", temperature: 34.5 },
  { time: "1 PM", temperature: 33 },
  { time: "2 PM", temperature: 32 },
  { time: "3 PM", temperature: 31 },
];

export const energyHistory = [
  { time: "8 AM", solar: 8, consumption: 3 },
  { time: "9 AM", solar: 12, consumption: 4 },
  { time: "10 AM", solar: 18, consumption: 5 },
  { time: "11 AM", solar: 22, consumption: 7 },
  { time: "12 PM", solar: 25, consumption: 8 },
  { time: "1 PM", solar: 21, consumption: 8 },
  { time: "2 PM", solar: 16, consumption: 6 },
  { time: "3 PM", solar: 12, consumption: 4 },
];

export const recentActivities = [
  {
    id: 1,
    title: "Fan activated",
    description: "Temperature exceeded the ventilation threshold.",
    time: "10:30 AM",
    type: "success",
  },
  {
    id: 2,
    title: "Adaptive control applied",
    description: "Ventilation adjusted based on temperature and battery availability.",
    time: "10:25 AM",
    type: "info",
  },
  {
    id: 3,
    title: "Battery status updated",
    description: "Battery level recorded at 72%.",
    time: "10:20 AM",
    type: "success",
  },
  {
    id: 4,
    title: "Environmental readings received",
    description: "Temperature, humidity and light readings updated.",
    time: "10:15 AM",
    type: "info",
  },
];
