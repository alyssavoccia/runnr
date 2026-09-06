import logo from "@/assets/images/logo.svg";

const LoadingScreen = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <img src={logo} alt="Runnr Logo" className="h-12" />
        <p className="text-sm text-brand-muted">Loading…</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
