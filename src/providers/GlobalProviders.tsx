"use client";

import compose from "compose-function";
import { withMaterial } from "./with-material";
import { withStore } from "./with-store";

const withGlobalProviders = compose(withMaterial, withStore);

export default withGlobalProviders;
