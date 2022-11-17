declare module "*.jpg";
declare module "*.svg";
declare module "*.png";
declare module "*.tsx";
declare module "*.scss";
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
declare module "*.json" {
  const value: any;
  export default value;
}
declare module "react-image-gallery";
