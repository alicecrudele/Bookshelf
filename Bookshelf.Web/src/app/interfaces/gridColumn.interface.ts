import { PipeTransform, TemplateRef } from '@angular/core';

export interface GridColumn {
  field: string;
  title: string;
  width?: number;
  minResizableWidth?: number;
  style?: any;
  headerStyle?: any;
  format?: string;
  filter: 'text' | 'numeric' | 'boolean' | 'date' | 'multicheckbox';
  dateType?: 'short' | 'long';
  sortable: boolean;
  resizable: boolean;
  filterable: boolean;
  inlineEdit?: boolean;
  template?: TemplateRef<any>;
  editTemplate?: TemplateRef<any>;
  headerTemplate?: TemplateRef<any>;
  groupable?: boolean;
  editable: boolean;
  locked?: boolean;
  hidden?: boolean;
  customFilter?: boolean;
  filterDisplayMemberPipe?: PipeTransform; // Indicare la Pipe per visualizzare correttamente i dati della multiCheckbox
  isPrimitive?: boolean;
  multiCheckboxShowInputSearch?: boolean; // se nella multiChecbox è da mostrare la barra di ricerca, di base false
}

export interface GridConstantsConfig {

}
