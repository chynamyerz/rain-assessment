import { ActionType } from "../../types";

export interface AddServiceProps {
  setAction: SetAction;
}

export interface useAddServiceParams {
  setAction: SetAction;
}

type SetAction = (sctionType: ActionType) => void;
