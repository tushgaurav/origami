import widgets from "./widgets.json";
import { getWidget } from "./registry";

export default function Widgets() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {widgets.widgets.map((widget) => {
                const WidgetComponent = getWidget(widget.id);
                if (!WidgetComponent) return null;
                return <WidgetComponent key={widget.id} />
            })}
        </div>
    )
}