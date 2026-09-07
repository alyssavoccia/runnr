import { BadgeCheck } from "lucide-react";

const ImportSources = ({ sources, source, setSource }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7 opacity-0 animate-fade-up animation-delay-100">
      {Object.values(sources).map(({ id, label, types, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setSource(id)}
          className={`group relative flex items-center gap-4 text-left py-5 px-6 cursor-pointer rounded-lg ${source === id ? "bg-brand-50 border-2 border-brand-600" : "bg-white border border-app-border hover:bg-brand-50 hover:border-brand-300"} transition duration-150 ease-in`}
        >
          {id === "garmin" && (
            <div className="absolute -top-3 left-5 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs bg-brand-600 text-brand-50">
              <BadgeCheck size={12} />
              Recommended
            </div>
          )}
          <div
            className={`flex items-center justify-center shrink-0 w-10 h-10 rounded-lg transition duration-150 ease-in ${source === id ? "bg-brand-100 text-brand-600" : "bg-brand-50 text-brand-mid group-hover:bg-brand-100 group-hover:text-brand-600"}`}
          >
            <Icon classes="w-5 h-5" />
          </div>
          <div>
            <p className="font-heading font-bold mb-px">{label}</p>
            <p className="text-xxs text-brand-muted">{types}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ImportSources;
