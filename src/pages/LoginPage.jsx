import { Check, Play, ChevronRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-dvh grid grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div className="bg-white h-full flex flex-col justify-center gap-8 py-20 px-10">
          <div>
            <h1 className="font-bold text-[clamp(2.4rem,4vw,3.4rem)] leading-none tracking-tight mb-6 opacity-0 animate-fade-up animation-delay-75">
              Train with
              <br />
              <em className="italic text-brand-600">intention.</em>
              <br />
              Run with data.
            </h1>
            <p className="text-brand-muted leading-7 max-w-sm opacity-0 animate-fade-up animation-delay-100">
              Your personal running dashboard. Import your history, sync every workout, and train smarter.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2 opacity-0 animate-fade-up animation-delay-150">
              <div className="w-6 h-6 flex items-center justify-center rounded-full shrink-0 text-brand-600 bg-brand-100 border border-brand-600/40">
                <Check size={12} strokeWidth={4} />
              </div>
              <div className="text-sm text-brand-mid">
                <strong className="text-brand-dark">Full history import:</strong> Apple Health or Garmin, parsed entirely in
                your browser.
              </div>
            </div>
            <div className="flex items-start gap-2 opacity-0 animate-fade-up animation-delay-200">
              <div className="w-6 h-6 flex items-center justify-center rounded-full shrink-0 text-brand-600 bg-brand-100 border border-brand-600/40">
                <Check size={12} strokeWidth={4} />
              </div>
              <div className="text-sm text-brand-mid">
                <strong className="text-brand-dark">VDOT pace zones:</strong> exact training paces from Jack Daniels'
                formula.
              </div>
            </div>
            <div className="flex items-start gap-2 opacity-0 animate-fade-up animation-delay-250">
              <div className="w-6 h-6 flex items-center justify-center rounded-full shrink-0 text-brand-600 bg-brand-100 border border-brand-600/40">
                <Check size={12} strokeWidth={4} />
              </div>
              <div className="text-sm text-brand-mid">
                <strong className="text-brand-dark">Private by design:</strong> no social feed, no sharing, just your data.
              </div>
            </div>
          </div>
        </div>
        <div className="h-full flex items-center justify-center bg-brand-50 md:border-l border-app-border p-10">
          <div className="w-full max-w-sm">
            <h2 className="font-bold text-3xl tracking-tight leading-none mb-3 opacity-0 animate-fade-up animation-delay-300">
              Welcome <em className="italic text-brand-600">back.</em>
            </h2>
            <p className="text-brand-muted text-sm mb-8 leading-tight opacity-0 animate-fade-up animation-delay-350">
              Access your workouts, pace zones, race predictions, and training data from anywhere.
            </p>
            <button className="flex items-center justify-center gap-3 bg-white border border-brand-200 cursor-pointer font-semibold text-xs px-5 py-3 rounded-md w-full mb-4 opacity-0 animate-fade-up animation-delay-400 hover:border-brand-300 hover:bg-brand-50 transition duration-150 ease-in">
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                    fill="#EA4335"
                  />
                </g>
              </svg>
              Continue with Google
            </button>
            <div className="flex items-center gap-3 mb-4 opacity-0 animate-fade-up animation-delay-450">
              <div className="flex-1 h-px bg-brand-100"></div>
              <span className="text-xs text-brand-muted">or</span>
              <div className="flex-1 h-px bg-brand-100"></div>
            </div>
            <button className="flex items-center justify-between cursor-pointer bg-brand-50 border border-brand-200 px-5 py-3 rounded-md w-full mb-6 opacity-0 animate-fade-up animation-delay-500 hover:bg-brand-100 hover:border-brand-300 transition duration-150 ease-in">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-brand-600 flex items-center justify-center shrink-0">
                  <Play size={11} className="text-white" fill="#FFF" />
                </div>
                <span className="text-sm">Try the demo</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-brand-muted">
                <span>sample data</span>
                <ChevronRight size={12} strokeWidth={2} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
