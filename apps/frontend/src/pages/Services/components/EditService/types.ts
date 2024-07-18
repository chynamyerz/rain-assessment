import { ActionType } from "../../types";

export interface EditServiceProps {
  setAction: SetAction;
}

export interface useEditServiceParams {
  setAction: SetAction;
}

type SetAction = (sctionType: ActionType) => void;
