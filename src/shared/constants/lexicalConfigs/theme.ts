import "./styles.css";
import type { EditorThemeClasses } from "lexical";

export const theme: EditorThemeClasses = {
  paragraph: "paragraph",
  heading: {
    h1: "heading-h1",
    h2: "heading-h2",
    h3: "heading-h3",
    h4: "heading-h4",
    h5: "heading-h5",
    h6: "heading-h6",
  },
  text: {
    base: "text-base",
    bold: "text-bold",
    italic: "text-italic",
    underline: "text-underline",
    strikethrough: "text-strikethrough",
  },
};
