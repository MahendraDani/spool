import { Navbar } from "@/components/navbar";
import { ThemeToggleButton } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <div className="container-wrapper">
      <div className="container">
        <p>Hello</p>
        <ThemeToggleButton/>
      </div>
    </div>
    </div>
  );
}
