import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-calculation",
  templateUrl: "./calculation.component.html",
  styleUrls: ["./calculation.component.css"],
})
export class CalculationComponent implements OnInit {
  group: number[] = [];
  scoreArray = new Array();
  isSubmitted = false;

  constructor() {}

  submitForm(form: NgForm) {
    this.isSubmitted = true;
    if (!form.valid) {
      return false;
    } else {
      var obj = JSON.parse(JSON.stringify(form.value));
      this.recalculate(obj.action, obj.modulo, obj.moduloValue);
    }
  }

  recalculate(
    action: string,
    shouldCalculateModulo: boolean,
    moduloValue: string
  ): void {
    this.group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.buildTableTemplate(
      action,
      shouldCalculateModulo,
      parseInt(moduloValue)
    );
    this.calculate(action, shouldCalculateModulo, parseInt(moduloValue));
  }

  private buildTableTemplate(
    action: string,
    shouldCalculateModulo: boolean,
    moduloValue: number
  ) {
    for (var i = 0; i <= this.group.length; i++) {
      this.scoreArray[i] = new Array();
      for (var j = 0; j <= this.group.length; j++) {
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
    for (var i = 1; i <= this.group.length; i++) {
      for (var j = 1; j <= this.group.length; j++) {
        if ("addition" == action && shouldCalculateModulo) {
          this.scoreArray[i][j] =
            (this.group[i - 1] + this.group[j - 1]) % moduloValue;
        } else if ("multiplication" == action && shouldCalculateModulo) {
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
    if ("multiplication" == action && shouldCalculateModulo) {
      return "* mod " + moduloValue;
    }
    if ("addition" == action && shouldCalculateModulo) {
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

  ngOnInit(): void {}
}
