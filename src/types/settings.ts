import type { Writable } from "svelte/store";

export type ISettings = {
  isItemsCompact: boolean;
  isGroupsCompact: boolean;
};

export const DEFAULT_SETTINGS: ISettings = {
  isItemsCompact: false,
  isGroupsCompact: false,
};

export type ISettingsModel = {
  load(): Promise<ISettings>;
  save(): Promise<void>;

  isItemsCompact: Writable<boolean>;
  isGroupsCompact: Writable<boolean>;
};
