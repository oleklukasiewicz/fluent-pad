import { writable, get } from "svelte/store";

import {
  DEFAULT_SETTINGS,
  type ISettings,
  type ISettingsModel,
} from "$type/settings";

import { firebaseSettingsAPI } from "$api/firebase";

const settingsApi = firebaseSettingsAPI;

export const settingsLoaded = writable(false);

export const isItemsCompact = writable(false);
export const isGroupsCompact = writable(false);
export const startupGroupId = writable("");

isGroupsCompact.subscribe(async (isCompact) => {
  if (!get(settingsLoaded)) return;
  await settingsApi.save({ isGroupsCompact: isCompact });
});
isItemsCompact.subscribe(async (isCompact) => {
  if (!get(settingsLoaded)) return;
  await settingsApi.save({ isItemsCompact: isCompact });
});
startupGroupId.subscribe(async (groupId) => {
  if (!get(settingsLoaded)) return;
  await settingsApi.save({ startupGroupId: groupId });
});

const loadvariables = function (settings) {
  isItemsCompact.set(settings.isItemsCompact);
  isGroupsCompact.set(settings.isGroupsCompact);
  startupGroupId.set(settings.startupGroupId);
};

export const settingsModel: ISettingsModel = {
  load: async function () {
    const settings = await settingsApi.load();
    loadvariables(settings);

    settingsLoaded.set(true);

    return settings;
  },
  save: async function () {
    await settingsApi.save({
      isItemsCompact: get(isItemsCompact),
      isGroupsCompact: get(isGroupsCompact),
    } as ISettings);
  },
  loadDefault: async function () {
    const settings = DEFAULT_SETTINGS;
    settingsLoaded.set(false);
    loadvariables(settings);

    return settings;
  },

  isGroupsCompact,
  isItemsCompact,
  settingsLoaded,
  startupGroupId,
};
