import { App, Modal, Setting } from "obsidian";

export class CreateTaskModal extends Modal {
  
  public taskName!: string;

  onSubmit: (taskName: string) => void;

  constructor(app: App, defaultTaskText: string, onSubmit: (taskName: string) => void ) {
    super(app);
    this.taskName = defaultTaskText;
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;

    contentEl.createEl("h3", { text: "What is the task?" });

    new Setting(contentEl)
      .setName("Task")
      .addText((text) =>
        text.setValue(this.taskName).onChange((value) => {
          this.taskName = value
      }));

    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Submit")
          .setCta()
          .onClick(() => {
            this.close();
            this.onSubmit(this.taskName);
          }));
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}