import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';


@Injectable()
export class TrafficChartService {

    constructor(private _baConfig:BaThemeConfigProvider) {
    }



  getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
    value: 0,
    color: dashboardColors.white,
    highlight: colorHelper.shade(dashboardColors.white, 15),
    label: 'Open',
    percentage: 0,
    order: 1,
  }, {
    value: 0,
    color: dashboardColors.gossip,
    highlight: colorHelper.shade(dashboardColors.gossip, 15),
    label: 'Assigned',
    percentage: 0,
    order: 4,
  }, {
    value: 0,
    color: dashboardColors.silverTree,
    highlight: colorHelper.shade(dashboardColors.silverTree, 15),
    label: 'Picked',
    percentage: 0,
    order: 3,
  }, {
    value: 0,
    color: dashboardColors.surfieGreen,
    highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
    label: 'Dropped',
    percentage: 0,
    order: 2,
  }, {
    value: 0,
    color: dashboardColors.blueStone,
    highlight: colorHelper.shade(dashboardColors.blueStone, 15),
    label: 'Cancelled',
    percentage: 0,
    order: 0,
  },
]
  }
}
