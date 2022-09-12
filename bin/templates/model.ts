export default `
/* GENERATED CODE */
import { AbstractControl } from '@angular/forms';
import { Base, BaseDTO } from './base.model';
import { formatDateForBackend } from 'src/app/helpers/time.utils';

export type $Replace$Filters = Partial<$Replace$DTO>;

export interface $Replace$DTO extends BaseDTO {
  $!DTO!$
}

export class $Replace$ extends Base {
  constructor(source: $Replace$DTO) {
    super(source);
    if (source) {
      $!constructor!$
    }
  }

  toDTO(): $Replace$DTO {
    let result: $Replace$DTO = <$Replace$DTO>super.toDTO();
    $!toDTO!$
    return result;
  }

  static fromFormGroup(formGroup: AbstractControl, original?: $Replace$) {
    const formModel = formGroup.value;
    let $replace$: $Replace$ = new $Replace$(null);
    $!fromFormGroup!$

    if (original) {
      $replace$.id = original.id;
    }
    return $replace$;
  }
}
`;