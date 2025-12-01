'use client';

import { type Value, TrailingBlockPlugin } from 'platejs';
import { type TPlateEditor, useEditorRef } from 'platejs/react';

import { AIKit } from '@/components/plugins/ai-kit';
import { AlignKit } from '@/components/plugins/align-kit';
import { AutoformatKit } from '@/components/autoformat-kit';
import { BasicBlocksKit } from '@/components/plugins/basic-blocks-kit';
import { BasicMarksKit } from '@/components/plugins/basic-marks-kit';
import { BlockMenuKit } from '@/components/plugins/block-menu-kit';
import { BlockPlaceholderKit } from '@/components/plugins/block-placeholder-kit';
import { CalloutKit } from '@/components/plugins/callout-kit';
import { CodeBlockKit } from '@/components/plugins/code-block-kit';
import { ColumnKit } from '@/components/plugins/column-kit';
import { CommentKit } from '@/components/plugins/comment-kit';
import { CursorOverlayKit } from '@/components/plugins/cursor-overlay-kit';
import { DateKit } from '@/components/plugins/date-kit';
import { DiscussionKit } from '@/components/discussion-kit';
import { DndKit } from '@/components/plugins/dnd-kit';
import { DocxKit } from '@/components/plugins/docx-kit';
import { EmojiKit } from '@/components/plugins/emoji-kit';
import { ExitBreakKit } from '@/components/plugins/exit-break-kit';
import { FixedToolbarKit } from '@/components/plugins/fixed-toolbar-kit';
import { FloatingToolbarKit } from '@/components/plugins/floating-toolbar-kit';
import { FontKit } from '@/components/plugins/font-kit';
import { LineHeightKit } from '@/components/plugins/line-height-kit';
import { LinkKit } from '@/components/plugins/link-kit';
import { ListKit } from '@/components/plugins/list-kit';
import { MarkdownKit } from '@/components/plugins/markdown-kit';
import { MathKit } from '@/components/plugins/math-kit';
import { MediaKit } from '@/components/plugins/media-kit';
import { MentionKit } from '@/components/plugins/mention-kit';
import { SlashKit } from '@/components/plugins/slash-kit';
import { SuggestionKit } from '@/components/plugins/suggestion-kit';
import { TableKit } from '@/components/plugins/table-kit';
import { TocKit } from '@/components/plugins/toc-kit';
import { ToggleKit } from '@/components/plugins/toggle-kit';
import { CopilotKit } from './plugins/copilot-kit';

export const EditorKit = [
  ...CopilotKit,
  ...AIKit,

  // Elements
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  ...TocKit,
  ...MediaKit,
  ...CalloutKit,
  ...ColumnKit,
  ...MathKit,
  ...DateKit,
  ...LinkKit,
  ...MentionKit,

  // Marks
  ...BasicMarksKit,
  ...FontKit,

  // Block Style
  ...ListKit,
  ...AlignKit,
  ...LineHeightKit,

  // Collaboration
  ...DiscussionKit,
  ...CommentKit,
  ...SuggestionKit,

  // Editing
  ...SlashKit,
  ...AutoformatKit,
  ...CursorOverlayKit,
  ...BlockMenuKit,
  ...DndKit,
  ...EmojiKit,
  ...ExitBreakKit,
  TrailingBlockPlugin,

  // Parsers
  ...DocxKit,
  ...MarkdownKit,

  // UI
  ...BlockPlaceholderKit,
  ...FixedToolbarKit,
  ...FloatingToolbarKit,
];

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;

export const useEditor = () => useEditorRef<MyEditor>();


//Editor AI//
// "use client";
// import React from "react";
// import { Plate, createPlateEditor, usePlateEditor } from "platejs/react";

// import { createParagraphPlugin, createHeadingPlugin } from "@platejs/basic-nodes/react";
// import { BoldPlugin, ItalicPlugin, UnderlinePlugin } from "@platejs/basic-nodes/react";

// import { createSlashPlugin } from "@platejs/slash-command";
// import { AiPlugin } from "@platejs/ai";  

// export default function EditorAI() {
//   const editor = usePlateEditor({
//     plugins: [
//       createParagraphPlugin(),
//       createHeadingPlugin(),
//       BoldPlugin,
//       ItalicPlugin,
//       UnderlinePlugin,
//       createSlashPlugin(),
//       AiPlugin,
//     ],
//   });

//   return (
//     <div className="w-full border rounded-xl p-5 shadow-sm bg-white">
//       <Plate editor={editor} />
//     </div>
//   );
// }
