import Markdown from "react-markdown";
import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { INITIAL_TEXT, NODES, theme } from "../../shared/constants";
import { createEditor } from "lexical";
import { CreateEditorArgs } from "lexical/LexicalEditor";
import { useStoreContext } from "../../contexts/StoreContext";
import { useEffect, useState } from "react";
import { createHeadlessEditor } from "@lexical/headless";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";

const onError = (error: Error) => console.error(error);

export const MardDownRender = () => {
  const { blocks } = useStoreContext();

  const [markddown, setMarkDown] = useState<string>("");

  const editor = createHeadlessEditor({
    nodes: [],
    onError: () => {},
  });

  // const editor = createEditor(initialState);
  console.log({ blocks });
  useEffect(() => {
    if (blocks === undefined) return;
    editor.update(
      () => {
        editor.setEditorState(editor.parseEditorState(blocks));
      },
      {
        discrete: true,
      },
    );
    editor.update(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      console.log("markdown: ", markdown);
      setMarkDown(markdown);
    });
  }, [blocks]);

  return <Markdown>{markddown}</Markdown>;
};
