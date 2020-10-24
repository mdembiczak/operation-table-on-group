import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CalculationService {
  group: number[] = [];
  scoreArray = new Array();
  groupInput: string;

  constructor() {}

  recalculate(obj: any): any {
    this.scoreArray = [];
    this.groupInput = obj.group;

    if (this.groupInput != "") {
      this.group = this.groupInput
        .split(",")
        .map((num) => parseInt(num))
        .filter((num) => !isNaN(num));
    }  else if(obj.predefinedGroup === 'oneToTwenty'){
      this.group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    } else if(obj.predefinedGroup === 'primeNumbers'){
      this.group = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    } else  if (!isNaN(parseInt(obj.moduloValue)) && obj.modulo) {
      this.generateTableByModulo(parseInt(obj.moduloValue));
    }

    
    

    this.buildTableTemplate(obj.action, obj.modulo, parseInt(obj.moduloValue));

    this.calculate(obj.action, obj.modulo, parseInt(obj.moduloValue));
    return this.scoreArray;
  }
  generateTableByModulo(moduloValue: number) {
    this.group = [];
    for (var i = 0; i < moduloValue; i++) {
      this.group.push(i);
    }
  }

  private buildTableTemplate(
    action: string,
    shouldCalculateModulo: boolean,
    moduloValue: number
  ) {
    for (var i = 0; i <= this.group.length && i <= 30; i++) {
      this.scoreArray[i] = new Array();
      for (var j = 0; j <= this.group.length && j <= 30; j++) {
        if (i === 0 && j === 0) {
          this.scoreArray[i][j] = this.chooseValidTableSign(
            action,
            shouldCalculateModulo,
            moduloValue
          );
        } else {
          if (i === 0) {
            this.scoreArray[i][j] = this.group[j - 1];
          } else if (j === 0) {
            this.scoreArray[i][j] = this.group[i - 1];
          }
        }
      }
    }
  }

  private calculate(
    action: string,
    shouldCalculateModulo: boolean,
    moduloValue: number
  ) {
    for (var i = 1; i <= this.group.length && i <= 30; i++) {
      for (var j = 1; j <= this.group.length && j <= 30; j++) {
        if ("addition" == action && shouldCalculateModulo && !isNaN(moduloValue)) {
          this.scoreArray[i][j] =
            (this.group[i - 1] + this.group[j - 1]) % moduloValue;
        } else if ("multiplication" == action && shouldCalculateModulo && !isNaN(moduloValue)) {
          this.scoreArray[i][j] =
            (this.group[i - 1] * this.group[j - 1]) % moduloValue;
        } else if ("addition" == action) {
          this.scoreArray[i][j] = this.group[i - 1] + this.group[j - 1];
        } else if ("multiplication" == action) {
          this.scoreArray[i][j] = this.group[i - 1] * this.group[j - 1];
        }
      }
    }
  }

  chooseValidTableSign(
    action: string,
    shouldCalculateModulo: boolean,
    moduloValue: number
  ) {
    if ("multiplication" == action && shouldCalculateModulo && !isNaN(moduloValue)) {
      return "* mod " + moduloValue;
    }
    if ("addition" == action && shouldCalculateModulo && !isNaN(moduloValue)) {
      return "+ mod " + moduloValue;
    }
    if ("addition" == action) {
      return "+";
    }
    if ("multiplication" == action) {
      return "*";
    }

    return "#";
  }
}
