import SystemMonitor from "./lib/system-monitor";

export const widgetRegistry = {
    'system-monitor': SystemMonitor,
}

export const getWidget = (id: string) => {
    return widgetRegistry[id as keyof typeof widgetRegistry] || null;
}