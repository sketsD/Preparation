import { useEffect } from "react";

export function useKey(key, actionCallBack) {
  useEffect(
    function () {
      function callBack(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          actionCallBack();
        }
      }
      document.addEventListener("keydown", callBack);
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [key, actionCallBack]
  );
}
