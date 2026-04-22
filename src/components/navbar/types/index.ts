export interface Section {
  id: string;
  label: string;
}

export interface NavbarProps {
  sections: Section[];
}

export interface Language {
  code: string;
  label: string;
  flag: string;
}
