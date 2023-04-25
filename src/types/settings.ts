import type { Writable } from "svelte/store";

export type ISettings = {
  isItemsCompact: boolean;
  isGroupsCompact: boolean;
  startupGroupId: string;
};

export const DEFAULT_SETTINGS: ISettings = {
  isItemsCompact: false,
  isGroupsCompact: false,
  startupGroupId: "",
};

export type ISettingsModel = {
  load(): Promise<ISettings>;
  save(): Promise<void>;
  loadDefault(): Promise<ISettings>;

  isItemsCompact: Writable<boolean>;
  isGroupsCompact: Writable<boolean>;
  startupGroupId: Writable<string>;
  settingsLoaded: Writable<boolean>;
};
