export interface IProps {
  title: string;
  color: {
    backGround: string;
    boxShadow: string;
  };
  barValue: number;
  value: string;
  png: React.ComponentType; // Assuming UilClipboardAlt is a React component
  series: {
    name: string;
    data: number[];
  }[];
}
