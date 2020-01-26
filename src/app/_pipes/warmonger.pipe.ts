import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../_classes/player';

@Pipe({
  name: 'warmonger'
})
export class WarmongerPipe implements PipeTransform {

  transform(value: Player[], ...args: any[]): any {
    let diff = [...value];
    return diff.filter(player => player.WarMonger == args[0]);
  }

}
