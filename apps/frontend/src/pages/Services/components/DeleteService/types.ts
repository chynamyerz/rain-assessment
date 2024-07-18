import { ActionType } from "../../types";

export interface DeleteServiceProps {
  setAction: SetAction;
}

export interface useDeleteServiceParams {
  setAction: SetAction;
}

type SetAction = (sctionType: ActionType) => void;
