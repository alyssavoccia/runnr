import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import { importHealth } from "@/utils/importHealth";
import ImportStatus from "@/components/ImportStatus";

const ImportZone = ({ source, setWorkouts }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileSize, setFileSize] = useState(0);

  const processFile = async (file) => {
    setFileSize(file.size);
    setLoading(true);

    try {
      const extension = file.name.split(".").pop();

      if (extension === "xml") {
        setWorkouts(await importHealth(file));
      }
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fileInputRef = useRef();

  const types = source.accept.split(",").map((type) => type.trim());

  return (
    <div className="space-y-4 opacity-0 animate-fade-up animation-delay-200">
      <div
        className="group card cursor-pointer flex flex-col items-center gap-4 p-10 border-2 border-dashed border-app-border-mid transition duration-100 ease-in hover:bg-brand-50 hover:border-brand-400"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-14 h-14 bg-brand-50 border-2 border-brand-100 rounded-lg flex items-center justify-center transition duration-100 ease-in group-hover:bg-brand-100 group-hover:border-brand-300">
          <Upload size={24} className="text-brand-600" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="font-heading font-bold leading-none">Drop your file here</p>
          <p className="text-xs text-brand-muted">or click to browse</p>
        </div>
        <div className="flex gap-2">
          {types.map((type, i) => (
            <span
              key={i}
              className="py-0.5 px-2 rounded-full font-semibold text-xxs text-brand-700 bg-brand-50 border border-brand-200"
            >
              {type}
            </span>
          ))}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={source.accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files[0];
            if (f) processFile(f);
          }}
        />
      </div>

      <ImportStatus loading={loading} fileSize={fileSize} error={error} />
    </div>
  );
};

export default ImportZone;
