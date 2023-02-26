import { derived, type Readable, type Writable } from "svelte/store";

import * as ui from "../models/ui";

export const isMobileView: Readable<boolean> = derived(ui.isMobileView, $isMobile => $isMobile);