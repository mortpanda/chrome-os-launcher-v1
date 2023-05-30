import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(app: any[], filter: Object): any {
    if (!app || !filter) {
      return app;
    }
    return app.filter(app => app.websiteName.indexOf(filter) !== -1);
  }

}
