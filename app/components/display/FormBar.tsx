import { forwardRef, type FC, Dispatch, SetStateAction } from "react";
import AppBar from "../navigation/AppBar";
import { MoreHorizontal, Save, XCircle } from "lucide-react";
import { useNavigate } from "@remix-run/react";
import ColorButton from "../buttons/ColorButton";
import IconColorButton from "../buttons/IconColorButton";

type RefType = HTMLDivElement;
type Props = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  saveText: string;
};
const FormBar = forwardRef<RefType, Props>(function FormBarComponent(
  props,
  ref
) {
  const navigate = useNavigate();
  return (
    <div
      ref={ref}
      className="w-screen fixed top-0 left-0 right-0 px-3  dark:bg-zinc-900 bg-zinc-100 md:bg-transparent border-zinc-300 dark:border-zinc-800 z-50 md:relative md:w-auto pb-1 md:border-none md:p-0 shadow-sm dark:border-b md:shadow-none"
    >
      <AppBar page="">
        <ColorButton type="submit" color="green">
          <Save className="h-4 w-4" />
          Save {props.saveText}
        </ColorButton>
        <ColorButton type="button" onClick={() => navigate(-1)} color="zinc">
          <XCircle className="h-4 w-4" />
          Cancel
        </ColorButton>
        <IconColorButton
          type="button"
          color="purple"
          Icon={MoreHorizontal}
        ></IconColorButton>
      </AppBar>
    </div>
  );
});

export default FormBar;
