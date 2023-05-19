export interface IAppTheme {
  id: string;
  name: string;
  colors: {
    body: string;
    text: string;
    textLight: string;
    subText: string;
    bgSection: string;
    bgPage: string;
    bgWrapper: string;
    primary: string;
    secondary: string;
    error: string;
    warning: string;
    info: string;
    success: string;
    edit: string;
    delete: string;
    note: string;
    highlight: string;
    active: string;
    sidebar: {
      default: string;
      background: string;
      activeBackground: string;
      text: string;
      textActive: string;
      active: string;
    };
    button: {
      text: string;
      background: string;
      border: string;
      borderBackground: string;
    };
    link: {
      text: string;
      opacity: number;
    };
    input: {
      border: string;
    };
    table: {
      rowLight: string;
      rowDark: string;
    };
  };
  font: string;
}
