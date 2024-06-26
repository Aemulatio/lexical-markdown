import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { INITIAL_TEXT, NODES, theme } from "../../shared/constants";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import s from "./Editor.module.css";
import { OnChangePlugin } from "./lib";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
  TRANSFORMERS,
} from "@lexical/markdown";
import { Toolbar } from "./ui";
import { Flex } from "antd";
import FloatingLinkEditorPlugin from "./lib/FloatingLinkEditorPlugin/FloatingLinkEditorPlugin.tsx";

const onError = (error: Error) => console.error(error);

export const Editor = () => {
  const initialState: InitialConfigType = {
    namespace: "editor",
    nodes: NODES,
    onError,
    theme,
    editorState: INITIAL_TEXT,
  };

  return (
    <LexicalComposer initialConfig={initialState}>
      <Flex vertical gap={"10px"}>
        <Toolbar />
        <RichTextPlugin
          contentEditable={<ContentEditable className={s.content} />}
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin />
        {/*<FloatingLinkEditorPlugin />*/}
        <MarkdownShortcutPlugin
          transformers={[
            ELEMENT_TRANSFORMERS,
            TEXT_FORMAT_TRANSFORMERS,
            TEXT_MATCH_TRANSFORMERS,
          ]}
        />
      </Flex>
    </LexicalComposer>
  );
};
