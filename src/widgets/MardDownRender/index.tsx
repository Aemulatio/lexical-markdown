import Markdown from "react-markdown";
import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { INITIAL_TEXT, NODES, theme } from "../../shared/constants";
import { $isParagraphNode, createEditor, ParagraphNode } from "lexical";
import { CreateEditorArgs } from "lexical/LexicalEditor";
import { useStoreContext } from "../../contexts/StoreContext";
import { useEffect, useState } from "react";
import { createHeadlessEditor } from "@lexical/headless";
import {
  $convertToMarkdownString,
  ElementTransformer,
  TRANSFORMERS,
} from "@lexical/markdown";
import { LinkNode } from "@lexical/link";
import { Flex } from "antd";
import rehypeRaw from "rehype-raw";

const onError = (error: Error) => console.error(error);

export const PARAGRAPH: ElementTransformer = {
  dependencies: [ParagraphNode],
  export: (node, exportChildren) => {
    if (!$isParagraphNode(node)) {
      return null;
    }

    const lines = exportChildren(node);
    console.log("lines: ", lines);
    // const output = [];
    // for (const line of lines) {
    //   output.push('> ' + line);
    // }
    // return output.join('\n');
    const out = `<p style="text-align: ${node.getFormatType() || "left"}"> ${lines} </p>`;

    return out;
  },
  type: "element",
};

export const MardDownRender = () => {
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
      const markdown = $convertToMarkdownString([...TRANSFORMERS, PARAGRAPH]);
      console.log("markdown: ", markdown);
      setMarkDown(markdown);
    });
  }, [blocks]);

  return (
    <Flex vertical>
      <Markdown rehypePlugins={[rehypeRaw]}>{markddown}</Markdown>
    </Flex>
  );
};
