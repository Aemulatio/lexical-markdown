import { Button, Flex } from "antd";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $convertToMarkdownString,
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from "@lexical/markdown";
import { FORMAT_ELEMENT_COMMAND } from "lexical";

export const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const handleMarkDown = () => {
    editor.getEditorState().read(() => {
      // const state = editor.getEditorState()
      const markdown = $convertToMarkdownString();
      console.log(markdown);
    });
  };

  const handleToLeft = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
  };
  const handleToRight = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
  };

  return (
    <Flex gap={"10px"} justify={"space-between"}>
      <Button onClick={handleMarkDown}>Markdown</Button>
      <Button onClick={handleToLeft}>To left</Button>
      <Button onClick={handleToRight}>To right</Button>
    </Flex>
  );
};
