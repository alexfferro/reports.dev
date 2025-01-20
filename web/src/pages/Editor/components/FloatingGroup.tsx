import { FloatingMenu, type Editor } from "@tiptap/react";
import { FloatingButton } from "./FloatingButton";
import { ImagePicker } from "./ImagePicker";

interface FloatingGroupProps {
  editor: Editor;
}

export function FloatingGroup({ editor }: FloatingGroupProps) {
  const handleRemoveSlash = () => {
    editor
      .chain()
      .focus()
      .deleteRange({
        from: editor.state.selection.from - 1,
        to: editor.state.selection.from,
      })
      .run();
  };
  const handleHeadingAction = (level: any) => {
    handleRemoveSlash;
    editor.chain().focus().toggleHeading({ level: level }).run();
  };
  return (
    <FloatingMenu
      className="bg-slate-900 py-2 px-1 shadow-xl border border-slate-700 shadow-black/20 rounded-lg overflow-hidden flex flex-col"
      shouldShow={({ state }) => {
        const { $from } = state.selection;
        const currentLineText = $from.nodeBefore?.textContent;
        return currentLineText === "/";
      }}
      editor={editor}
    >
      <FloatingButton
        src="https://www.notion.so/images/blocks/header.57a7576a.png"
        title="Heading 1"
        subtitle="Big section heading"
        onClick={() => handleHeadingAction(1)}
      />
      <FloatingButton
        src="https://www.notion.so/images/blocks/subheader.9aab4769.png"
        title="Heading 2"
        subtitle="Medium section heading"
        onClick={() => handleHeadingAction(2)}
      />
      <FloatingButton
        src="https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png"
        title="Heading 3"
        subtitle="small section heading"
        onClick={() => handleHeadingAction(2)}
      />
      <ImagePicker editor={editor} />
      <FloatingButton
        src="https://www.notion.so/images/blocks/bulleted-list.0e87e917.png"
        title="Bulleted List"
        subtitle="Create a simple bulleted list"
        onClick={() => {
          handleRemoveSlash();
          editor.chain().focus().toggleBulletList().run();
        }}
      />
      <FloatingButton
        src="https://www.notion.so/images/blocks/numbered-list.0406affe.png"
        title="Numbered List"
        subtitle="Create a simple Numbered list"
        onClick={() => {
          handleRemoveSlash();
          editor.chain().focus().toggleOrderedList().run();
        }}
      />
      <FloatingButton
        src="https://www.notion.so/images/blocks/divider.210d0faf.png"
        title="Divide"
        subtitle="Create a simple Horizontal Rule"
        onClick={() => {
          handleRemoveSlash();
          editor.chain().focus().setHorizontalRule().run();
        }}
      />
      <FloatingButton
        src="https://www.notion.so/images/blocks/to-do.f8d20542.png"
        title="To do List"
        subtitle="Create a simple To do List"
        data-type={editor.isActive("taskList") ? "is-active" : ""}
        onClick={() => {
          handleRemoveSlash();
          editor.chain().focus().toggleTaskList().run();
        }}
      />
    </FloatingMenu>
  );
}
