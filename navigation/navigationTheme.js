import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

export default {
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
  },
};
