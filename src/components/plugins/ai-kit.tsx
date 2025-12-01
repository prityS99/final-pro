'use client';

import { withAIBatch } from '@platejs/ai';
import {
  AIChatPlugin,
  AIPlugin,
  applyAISuggestions,
  streamInsertChunk,
  useChatChunk,
} from '@platejs/ai/react';
import { getPluginType, KEYS, PathApi } from 'platejs';
import { usePluginOption } from 'platejs/react';

import { AILoadingBar, AIMenu } from '@/components/ui/ai-menu';
import { AIAnchorElement, AILeaf } from '@/components/ui/ai-node';


import { CursorOverlayKit } from './cursor-overlay-kit';
import { MarkdownKit } from './markdown-kit';
import { useChat } from '../use-chat';

export const aiChatPlugin = AIChatPlugin.extend({
  options: {
    chatOptions: {
      api: '/api/ai/command',
      body: {},
    },
  },
  render: {
    afterContainer: AILoadingBar,
    afterEditable: AIMenu,
    node: AIAnchorElement,
  },
  shortcuts: {
    show: { keys: 'mod+j' },
  },
  useHooks: ({ editor, getOption }) => {
    // Initialize chat functionality
    useChat();

    const mode = usePluginOption(AIChatPlugin, 'mode');
    const toolName = usePluginOption(AIChatPlugin, 'toolName');

    useChatChunk({
      onChunk: ({ chunk, isFirst, nodes, text: content }) => {
        if (isFirst && mode === 'insert') {
          // Insert a new AI chat node after current selection when starting insert mode
          editor.tf.withoutSaving(() => {
            editor.tf.insertNodes(
              {
                type: getPluginType(editor, KEYS.aiChat),
                children: [{ text: '' }],
              },
              {
                at: PathApi.next(editor.selection!.focus.path.slice(0, 1)),
              }
            );
          });
          editor.setOption(AIChatPlugin, 'streaming', true);
        }

        if (mode === 'insert' && nodes.length > 0) {
          // Stream chunks of AI chat response incrementally into the editor
          withAIBatch(
            editor,
            () => {
              if (!getOption('streaming')) return;
              editor.tf.withScrolling(() => {
                streamInsertChunk(editor, chunk, {
                  textProps: {
                    [getPluginType(editor, KEYS.ai)]: true,
                  },
                });
              });
            },
            { split: isFirst }
          );
        }

        if (toolName === 'edit' && mode === 'chat') {
          // Apply AI suggestions to the editor content when editing in chat mode
          withAIBatch(
            editor,
            () => {
              applyAISuggestions(editor, content);
            },
            { split: isFirst }
          );
        }
      },
      onFinish: () => {
        // Reset streaming flags and temporary options on completion
        editor.setOption(AIChatPlugin, 'streaming', false);
        editor.setOption(AIChatPlugin, '_blockChunks', '');
        editor.setOption(AIChatPlugin, '_blockPath', null);
        editor.setOption(AIChatPlugin, '_mdxName', null);
      },
    });
  },
});

export const AIKit = [
  ...CursorOverlayKit,
  ...MarkdownKit,
  AIPlugin.withComponent(AILeaf),
  aiChatPlugin,
];
