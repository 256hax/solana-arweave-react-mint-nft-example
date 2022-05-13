export type attributesType = {
  [key: string]: string
};

type arrayIndexType = number;

export type handleOnChangeType = {
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: arrayIndexType): void;
};

export type removeFieldType = {
  (index: arrayIndexType): void;
};
