import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { SerializedRootNode } from "lexical";
import { SerializedEditorState } from "lexical/LexicalEditorState";

interface StoreContextValue {
  blocks: SerializedEditorState;
  setBlocks: Dispatch<SetStateAction<SerializedEditorState>>;
}

const StoreContext = createContext<StoreContextValue>({} as StoreContextValue);

export const StoreProvider = (props: PropsWithChildren) => {
  const [state, setState] = useState<SerializedEditorState>();

  const value = useMemo(
    () => ({ blocks: state, setBlocks: setState }),
    [state],
  );

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("No context");
  }

  return context;
};
