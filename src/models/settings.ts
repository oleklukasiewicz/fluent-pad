import type { ISettings, ISettingsModel } from "$type/settings";
import { writable, get } from "svelte/store";
import { firebaseSettingsAPI } from "$api/firebase";
import { isUserLogged } from "./user";

const settingsApi = firebaseSettingsAPI;

let settingsLoaded = false;

export const isItemsCompact = writable(false);
export const isGroupsCompact = writable(false);


isGroupsCompact.subscribe(async (isCompact) => {
  if (!settingsLoaded) return;
  await settingsApi.save({ isGroupsCompact: isCompact });
});
isItemsCompact.subscribe(async (isCompact) => {
  if (!settingsLoaded) return;
  await settingsApi.save({ isItemsCompact: isCompact });
});

export const settingsModel: ISettingsModel = {
  load: async function () {
    const settings = await settingsApi.load();
    isItemsCompact.set(settings.isItemsCompact);
    isGroupsCompact.set(settings.isGroupsCompact);

    settingsLoaded = true;

    return settings;
  },
  save: async function () {
    await settingsApi.save({
      isItemsCompact: get(isItemsCompact),
      isGroupsCompact: get(isGroupsCompact),
    } as ISettings);
  },
  isGroupsCompact,
  isItemsCompact,
};
isUserLogged.subscribe(async (isLogged) => {
  if (isLogged) {
    await settingsModel.load();
  }
});
