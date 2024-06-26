import { Button, Flex } from "antd";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $convertToMarkdownString,
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from "@lexical/markdown";

export const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const handleMarkDown = () => {
    editor.getEditorState().read(() => {
      // const state = editor.getEditorState()
      const markdown = $convertToMarkdownString([
        ELEMENT_TRANSFORMERS,
        TEXT_FORMAT_TRANSFORMERS,
        TEXT_MATCH_TRANSFORMERS,
      ]);
      console.log(markdown);
    });
  };

  return (
    <Flex gap={"10px"} justify={"space-between"}>
      <Button onClick={handleMarkDown}>Markdown</Button>
    </Flex>
  );
};
