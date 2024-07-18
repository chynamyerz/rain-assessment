import { useState } from "react";
import { ActionType } from "../types";
import { useNavigate } from "react-router-dom";

export const useServices = () => {
  const [action, setAction] = useState<ActionType>();
  const navigate = useNavigate();

  const handleAction = (actionType: ActionType) => {
    switch (actionType) {
      case "add":
        setAction("add");
        break;
      case "edit":
        setAction("edit");
        break;
      case "delete":
        setAction("delete");
        break;
      default:
        setAction(undefined);
        return;
    }
  };

  const handleNavigateback = () => {
    navigate(-1);
  };

  return {
    action,
    handleAction,
    handleNavigateback,
  };
};
