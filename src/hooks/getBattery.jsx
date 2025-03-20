const getBattery = async () => {
  try {
    const battery = await navigator.getBattery();
    return { level: battery.level, charging: battery.charging };
  } catch (error) {
    console.error("Battery API not supported", error);
    return null;
  }
};

export default getBattery;
