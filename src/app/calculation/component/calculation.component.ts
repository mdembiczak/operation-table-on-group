import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CalculationService } from "../service/calculation.service";

@Component({
  selector: "app-calculation",
  templateUrl: "./calculation.component.html",
  styleUrls: ["./calculation.component.css"],
})
export class CalculationComponent implements OnInit {
  group: number[] = [];
  scoreArray = new Array();
  isSubmitted = false;

  constructor(private calculationService: CalculationService) {}

  submitForm(form: NgForm) {
    this.isSubmitted = true;
    if (!form.valid) {
      return false;
    } else {
      var obj = JSON.parse(JSON.stringify(form.value));
      this.recalculate(obj);
    }
  }

  recalculate(obj: any) {
    this.scoreArray = this.calculationService.recalculate(obj);
  }

  ngOnInit(): void {}
}
