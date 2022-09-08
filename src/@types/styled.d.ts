import { Theme } from "../presentation/models/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
