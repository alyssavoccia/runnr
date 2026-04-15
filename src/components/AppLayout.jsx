import Sidenav from "@/components/Sidenav";

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-dvh bg-app-background">
      <Sidenav />
      <main className="ml-14 md:ml-60 flex-1 min-h-dvh">
        <div className="py-10 px-11">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
