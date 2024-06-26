import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useStoreContext } from "../../../contexts/StoreContext";
import {
  $convertToMarkdownString,
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from "@lexical/markdown";

export const OnChangePlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { setBlocks } = useStoreContext();

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      setBlocks(editorState.toJSON());
    });
  }, [editor]);

  return null;
};
