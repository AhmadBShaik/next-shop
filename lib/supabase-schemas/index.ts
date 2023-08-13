import { MergeDeep } from "type-fest";
import { Database as PublicSchema } from "./public";
import { Database as ShopSchema } from "./shop";
export type { Json as PublicSchemaJson } from "./public";
export type { Json as ShopSchemaJson } from "./shop";

export type Database = MergeDeep<PublicSchema, ShopSchema>;
