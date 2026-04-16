import { CircleAlert } from "lucide-react";

const ImportStatus = ({ loading, fileSize, error }) => {
  const isLargeFile = fileSize > 500 * 1024 * 1024;

  const formatBytes = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  return (
    <>
      {loading && (
        <div className="card px-5 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-brand-400 border-t-transparent animate-spin shrink-0" />
              <span className="text-sm font-body text-brand-muted">Parsing…</span>
            </div>
            {fileSize > 0 && <span className="text-xs text-brand-muted">{formatBytes(fileSize)}</span>}
          </div>
          {isLargeFile && (
            <p className="text-xs text-brand-muted">Large file, this may take a few minutes. Don't close the tab.</p>
          )}
        </div>
      )}

      {error && (
        <div className="card px-5 py-4 space-y-2 border-red-200 bg-red-50">
          <div className="flex items-center gap-3">
            <CircleAlert size={18} className="text-red-700 shrink-0" strokeWidth={2} />
            <p className="text-xs text-red-700">Something went wrong. Please check your file and try again.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ImportStatus;
