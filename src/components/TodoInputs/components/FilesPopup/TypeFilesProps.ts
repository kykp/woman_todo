export type PopupProps = {
  trigger: boolean;
  className?: string;
  children?: any;
  id: string;
  attachedFiles: string[];
  title: string;
  textBody: string;
  urls: string[];
  onHandlePopup: () => void;
};
