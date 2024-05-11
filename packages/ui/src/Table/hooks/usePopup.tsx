import { useCallback, useRef } from "react";
const defaultMouseEnterDelay = 500;
const defaultMouseLeaveDelay = 200;
const usePopup = ({}: any) => {
  const defRef = useRef();
  const onHover = useRef(false);

  const triggerTooltipVisible = useCallback((visible:boolean,event?: any,value?:any) => {
    onHover.current = true;
    if (defRef.current) {
      clearTimeout(defRef.current);
    }
    defRef.current = setTimeout(() => {
      const tooltipdiv = document.getElementById("table_tooltip");

      if (tooltipdiv === null) return;
      tooltipdiv.firstChild && tooltipdiv.removeChild(tooltipdiv.firstChild)

      if (visible) {
      const left =
        event.target.getBoundingClientRect().left +
        event.target.clientWidth / 2;
      const top =
        event.target.getBoundingClientRect().top + event.target.clientHeight;

      tooltipdiv.style.left = left + "px";
      tooltipdiv.style.top = top + 15 + "px";
      tooltipdiv.style.display = "flex";
      const s = document.createTextNode(value)
      tooltipdiv.appendChild(s)
    }else{
        tooltipdiv.style.display = "none";
    }
    }, visible?defaultMouseEnterDelay:defaultMouseLeaveDelay);
  }, []);

  return { triggerTooltipVisible,  };
};
export default usePopup;
