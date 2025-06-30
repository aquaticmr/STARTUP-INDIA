
import Navbar from "../components/Navbar";
export default function Layout({ children}: Readonly<{ children: React.ReactNode}> ) {
  return (
    <div>
      <Navbar />
      {children}
      {/* You can add more layout components here, like a footer or sidebar */}
    </div>
  );
}