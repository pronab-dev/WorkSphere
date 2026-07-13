  import { useEffect, useState } from "react";
  import { orbit } from "ldrs";

  orbit.register();

  export default function Loader({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500); // Adjust or remove delay as needed

      return () => clearTimeout(timer);
    }, []);

    if (loading) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <l-orbit size="50" speed="1.5" color="#2563eb"></l-orbit>
        </div>
      );
    }

    return children;
  }
