type ConfigType = {
  id: number;
  name: string;
  element: () => JSX.Element;
  svgIconPath: string;
  category?: string;
};
