import { useTheme } from "@material-ui/core";
import "@iw/types";

export const useMUITest = (): void => {
    const theme = useTheme();

    console.log(theme.palette);
    console.log(theme.palette.common);
    console.log(theme.palette.common.red2);
};
