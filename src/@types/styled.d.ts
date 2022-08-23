import { Theme } from "../models/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
