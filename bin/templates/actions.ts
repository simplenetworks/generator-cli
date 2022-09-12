export default `
import { createAction, props } from '@ngrx/store';
import { Offer } from 'src/app/commons/models/offer.model';

import { $Replace$, $Replace$DTO, $Replace$Filters } from '../../commons/models/$replace$.model';

export const load$Replace$s = createAction('[$Replace$s] Load $Replace$s', props<{ page: number, perPage: number, order?: string, direction?: string, filters?: $Replace$Filters, includes?: string[] }>());
export const load$Replace$sCompleted = createAction('[$Replace$s] Load $Replace$s Completed', props<{ $replace$s: $Replace$DTO[], currentPage: number, total: number, perPage: number, order?: string, direction?: string, filters?: $Replace$Filters, includes?: string[] }>());
export const load$Replace$sFailed = createAction('[$Replace$s] Load $Replace$s Failed', props<{ error: any }>());

export const changePage = createAction('[$Replace$s] Change page', props<{ page: number, size: number }>());
export const changeSort = createAction('[$Replace$s] Change sort', props<{ order: string, direction: string }>());
export const changeFilters = createAction('[$Replace$s] Change filters', props<{ filters: $Replace$Filters }>());

export const edit$Replace$ = createAction('[$Replace$s] Edit $replace$', props<{ $replace$: $Replace$ }>());
export const $replace$DialogOpened = createAction('[$Replace$s] Detail dialog opened', props<{ dialogId: string }>());
export const close$Replace$Dialog = createAction('[$Replace$s] Close detail dialog');

export const show$Replace$ = createAction('[$Replace$s] Show $replace$', props<{ $replace$: $Replace$DTO }>());
export const add$Replace$ = createAction('[$Replace$] Add $replace$');
export const load$Replace$ = createAction('[$Replace$s] Load $replace$', props<{ id: number }>());
export const load$Replace$Completed = createAction('[$Replace$s] Load $replace$ Completed', props<{ $replace$: $Replace$DTO }>());
export const load$Replace$Failed = createAction('[$Replace$s] Load $replace$ Failed', props<{ error: any }>());

export const save$Replace$ = createAction('[$Replace$s] Save $replace$', props<{ $replace$: $Replace$ }>());
export const save$Replace$Completed = createAction('[$Replace$s] Save $replace$ completed', props<{ $replace$: $Replace$DTO }>());
export const save$Replace$Failed = createAction('[$Replace$s] Save $replace$ failed', props<{ error: any }>());

export const delete$Replace$ = createAction('[$Replace$s] Delete $replace$', props<{ $replace$: $Replace$DTO }>());
export const delete$Replace$Completed = createAction('[$Replace$s] Delete $replace$ completed', props<{ $replace$: $Replace$DTO }>());
export const delete$Replace$Cancelled = createAction('[$Replace$s] Delete $replace$ cancelled');
export const delete$Replace$Failed = createAction('[$Replace$s] Delete $replace$ failed', props<{ error: any }>());

export const select$Replace$ = createAction('[$Replace$s] Select $replace$', props<{ filters?: $Replace$Filters }>());
export const selectionDialogOpened = createAction('[$Replace$s] Selection dialog opened', props<{ selectionDialogId: string }>());
export const closeSelectionDialog = createAction('[$Replace$s] Close selection dialog');
export const $replace$Selected = createAction('[$Replace$s] $Replace$ selected', props<{ $replace$: $Replace$DTO }>());
`;