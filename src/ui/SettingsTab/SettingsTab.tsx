import ObsidianTodoistPlugin from "../../main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class SettingsTab extends PluginSettingTab {
  plugin: ObsidianTodoistPlugin;

  constructor(app: App, plugin: ObsidianTodoistPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();


    containerEl.createEl("h3", { text: "Obsidian Todoist Settings" });

    new Setting(containerEl)
      .setName("Todoist API Key")
      .setDesc("Enter your Todoist API Key")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.todoistApiKey!)
          .onChange(async (value) => {
            this.plugin.settings.todoistApiKey = value;
            await this.plugin.saveSettings();
          })
      );
  }
}