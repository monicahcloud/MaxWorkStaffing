// import { useEffect } from "react";

// export default function useUnloadWarning(condition = true) {
//   useEffect(() => {
//     if (!condition) {
//       return;
//     }

//     const listener = (event: BeforeUnloadEvent) => {
//       event.preventDefault();
//     };

//     window.addEventListener("beforeunload", listener);

//     return () => window.removeEventListener("beforeunload", listener);
//   }, [condition]);
// }
import { useEffect } from "react";

export default function useUnloadWarning(condition = true) {
  useEffect(() => {
    if (!condition) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // ✅ Required for Chrome, Firefox
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [condition]);
}
