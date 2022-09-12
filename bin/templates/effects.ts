export default `
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { $Replace$EditComponent } from 'src/app/modules/home/$replace$s/$replace$-edit/$replace$-edit.component';
import { $Replace$SelectionComponent } from 'src/app/modules/shared/$replace$-selection/$replace$-selection.component';
import { AlertService } from '../../commons/services/alert.service';
import { Laravel$Replace$Service } from '../../commons/services/backend/laravel-$replace$.service';
import * as $Replace$Actions from '../actions/$replace$.actions';
import { AppState } from '../reducers';
import { get$Replace$DialogId, get$Replace$sTableState, getSelectionDialogId } from '../selectors/$replace$.selectors';


@Injectable()
export class $Replace$Effects {

  error$ = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.save$Replace$Failed),
      tap(({ error }) => {
        if (error) {
          this.alertService.showErrorMessage('Errore', error);
        }
      })
    ), { dispatch: false }
  );

  load$Replace$s$ = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.load$Replace$s),
      switchMap(({ page, perPage, order, direction, filters, includes }) => {
        return this.$replace$Service.list(page, perPage, order, direction, filters, includes)
          .pipe(
            map(result =>
              $Replace$Actions.load$Replace$sCompleted({ $replace$s: result.data, currentPage: page, total: result.total, perPage, order, direction, filters, includes })
            ),
            catchError(error => {
              return of($Replace$Actions.load$Replace$sFailed({ error }))
            })
          )
      })
    )
  );

  changePage = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.changePage),
      withLatestFrom(this.store$.select(get$Replace$sTableState)),
      map(([{ page, size }, { total, currentPage, perPage, direction, order, filters, includes }]) => $Replace$Actions.load$Replace$s({ page: page, perPage: size, order, direction, filters, includes }))
    )
  );

  changeSort = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.changeSort),
      withLatestFrom(this.store$.select(get$Replace$sTableState)),
      map(([action, { total, currentPage, perPage, direction, order, filters, includes }]) => $Replace$Actions.load$Replace$s({ page: currentPage, perPage: perPage, order: action.order, direction: action.direction, filters, includes }))
    )
  );

  changeFilters = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.changeFilters),
      withLatestFrom(this.store$.select(get$Replace$sTableState)),
      map(([{ filters }, { total, currentPage, perPage, direction, order, includes }]) => $Replace$Actions.load$Replace$s({ page: currentPage, perPage: perPage, order, direction, filters, includes }))
    )
  );

  edit$Replace$$ = createEffect(() => this.actions$.pipe(
    ofType($Replace$Actions.edit$Replace$),
    map(({ $replace$ }) => {
      let dialogRef = this.dialog.open($Replace$EditComponent, {
        data: {
          $replace$
        }
      });
      return $Replace$Actions.$replace$DialogOpened({ dialogId: dialogRef.id });
    }))
  );

  save$Replace$$ = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.save$Replace$),
      mergeMap(({ $replace$ }) =>
        this.$replace$Service.upsert($replace$.toDTO())
          .pipe(
            map(result =>
              $Replace$Actions.save$Replace$Completed({ $replace$: result })
            ),
            catchError(error => of($Replace$Actions.save$Replace$Failed({ error })))
          )
      )
    )
  );

  onSaveCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.save$Replace$Completed),
      map(action => action.$replace$),
      tap($replace$ => this.alertService.showConfirmMessage(\`\${ $replace$.name } salvato con successo\`)),
      map(() => $Replace$Actions.close$Replace$Dialog())
    )
  );


  delete$Replace$$ = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.delete$Replace$),
      switchMap(({ $replace$ }) =>
        this.alertService.showConfirmDialog('Conferma eliminazione', \`Sei sicuro di voler eliminare il contatto \${ $replace$.name }?\`)
          .pipe(
            mergeMap((confirm) => {
              return confirm ?
                this.$replace$Service.delete($replace$.id)
                  .pipe(
                    map(() => $Replace$Actions.delete$Replace$Completed({ $replace$ })),
                    catchError(error => of($Replace$Actions.delete$Replace$Failed({ error })))
                  )

                : of($Replace$Actions.delete$Replace$Cancelled());
            })
          )
      )
    )
  );

  onDeleteCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.delete$Replace$Completed),
      tap(({ $replace$ }) => this.alertService.showConfirmMessage(\`\${$replace$.name} eliminato con successo\`)),
      map(() => $Replace$Actions.close$Replace$Dialog())
    )
  );


  closeDialog = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.close$Replace$Dialog),
      withLatestFrom(this.store$.select(get$Replace$DialogId)),
      tap(([_, dialogId]) => {
        if (dialogId) {
          this.dialog.getDialogById(dialogId).close();
        }
      })
    ), { dispatch: false }
  );

  reloadAfterSave = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.save$Replace$Completed),
      withLatestFrom(this.store$.select(get$Replace$sTableState)),
      map(([_, { currentPage, perPage, direction, order, filters, includes }]) => $Replace$Actions.load$Replace$s({ page: currentPage, perPage, order, direction, filters, includes }))
    )
  );

  reloadAfterDelete = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.delete$Replace$Completed),
      withLatestFrom(this.store$.select(get$Replace$sTableState)),
      map(([_, { currentPage, perPage, direction, order, filters, includes }]) => $Replace$Actions.load$Replace$s({ page: currentPage, perPage, order, direction, filters, includes }))
    )
  );

  select$Replace$$ = createEffect(() => this.actions$.pipe(
    ofType($Replace$Actions.select$Replace$),
    map(({ filters, formControlName }) => {
      let dialogRef = this.dialog.open($Replace$SelectionComponent, {
        data: {
          defaultFilters: filters,
          formControlName
        }
      });
      return $Replace$Actions.selectionDialogOpened({ selectionDialogId: dialogRef.id });
    }))
  );
  closeSelectionDialog = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.closeSelectionDialog),
      withLatestFrom(this.store$.select(getSelectionDialogId)),
      tap(([_, dialogId]) => {
        if (dialogId) {
          this.dialog.getDialogById(dialogId).close();
        }

      })
    ), { dispatch: false }
  );

  $replace$sSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType($Replace$Actions.$replace$Selected),
      map(() => $Replace$Actions.closeSelectionDialog())
    ))


  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private $replace$Service: Laravel$Replace$Service,
    private dialog: MatDialog,
    private alertService: AlertService
  ) { }
}
`