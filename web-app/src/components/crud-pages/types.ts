export type ColumnNamesType = Array<string>;

export interface CrudObjectInterface {
  id: number;
  [key: string]: any;
}

export interface FormSettingInterface {
  label: string;
  setting: string;
  type?: string;
  [key: string]: any;
}

export interface FormSettingWithData extends FormSettingInterface {
  value: string | number;
  onChange: Function;
}