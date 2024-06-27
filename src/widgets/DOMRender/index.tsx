import { useStoreContext } from "../../contexts/StoreContext";
import { useEffect, useState } from "react";
import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LinkNode } from "@lexical/link";
import { hydrateRoot } from "react-dom/client";

export const DOMRender = () => {
  const { blocks } = useStoreContext();

  const [markddown, setMarkDown] = useState<string>("");

  const editor = createHeadlessEditor({
    nodes: [LinkNode],
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
      const markdown = $generateHtmlFromNodes(editor);
      console.log("markdown: ", markdown);
      setMarkDown(markdown);
    });
  }, [blocks]);

  return <div></div>;
};
