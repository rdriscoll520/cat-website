import Gallery from "./components/Gallery";
import Slideshow from "./components/Slideshow";
export default function Home() {
  return (
    <div>
      <h1>hi my name is owen the cat i like to kill innocent animals and scratch people for fun</h1>
      <div className="relative flex items-center justify-center mt-10">
        <h1 className="text-7xl font-bold text-gray-100 tracking-wide border-b-4 border-teal-400 pb-2 shadow-lg">
          Gallery
        </h1>
      </div>
      <Slideshow/>
    </div>
  );
}
