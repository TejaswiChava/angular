import { Injectable } from '@angular/core';

@Injectable()
export class ValidateGraphService {

  isZero(item) {
    return item.value === 0;
  }

  validateBarGraph(GraphInfo: any = []) {
    return GraphInfo.every(this.isZero);
  }

  MultiBarGraphValidate(GraphsInfo: any = []) {
    return GraphsInfo.every(function (item){
      return item.series.every(function(seriesItem) {
        return seriesItem.value === 0;
      });
    });
  }
  constructor() { }
}
