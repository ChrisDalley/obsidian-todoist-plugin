import React from "react";
import { Editor, MarkdownView, Plugin } from 'obsidian';
import { createRoot } from 'react-dom/client';
import { TaskBlock } from './ui/TaskBlock/TaskBlock';
import { CreateTaskModal } from "./ui/CreateTaskModal/CreateTaskModal";
import { TodoistApi } from "@doist/todoist-api-typescript";
import SettingsTab from "./ui/SettingsTab";


export interface ObsidianTodoistSettings {
  todoistApiKey: string | null;
}

const DEFAULT_SETTINGS: ObsidianTodoistSettings = {
  todoistApiKey: null
}

export default class ObsidianTodoistPlugin extends Plugin {
  public settings!: ObsidianTodoistSettings;

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }


  async onload() {

    this.registerMarkdownCodeBlockProcessor('obsidian-todoist', (source, element, context) => {

      const root = createRoot(element);

      const { todoistApiKey } = this.settings;

      if (!todoistApiKey) {
        root.render(<div>No API key set in settings</div>)
        return;
      }

      if (source.trim().startsWith("id:")) {

        const taskId = source?.match(/(?<=id:)\S+/gm)?.[0];

        const removeBlock = () => {
          const view = this.app.workspace.getActiveViewOfType(MarkdownView);
          // @ts-ignore
          const sec = context.getSectionInfo(context.el);

          console.log(sec);

          if (!sec) {
            return;
          }
          view?.editor.replaceRange("", { line: sec.lineStart, ch: 0 }, { line: sec.lineEnd + 1, ch: 0 })
          view?.editor.setCursor({ line: sec.lineStart, ch: 0 });
        }

        if (taskId) {
          root.render(<TaskBlock id={taskId} settings={this.settings} onRemoveBlock={removeBlock} />)
        }
        return;

      }

      root.render(<div>Something went wrong </div>)

    })

    this.addCommand({
      id: "create-task",
      name: "Create Task",
      editorCallback: (editor: Editor) => {

        if (!this.settings.todoistApiKey) {
          alert("No API key present in settings")
          return;
        }

        const selectedText = editor.getSelection();

        console.log(selectedText);

        const onSubmit = (taskName: string) => {

          if (!this.settings.todoistApiKey) {
            alert("No API key present in settings")
            return;
          }
          const todoistApi = new TodoistApi(this.settings.todoistApiKey);

          todoistApi.addTask({
            content: taskName
          }).then(task => {
            const { id } = task;

            editor.replaceSelection(`\`\`\`obsidian-todoist
id:${id}
\`\`\`
`)
          }).catch(
            error => console.error(error)
          )

        };

        new CreateTaskModal(this.app, selectedText, onSubmit).open();
      },
    });


    await this.loadSettings();

    this.addSettingTab(new SettingsTab(this.app, this));


  }

  onunload() {
  }

}
