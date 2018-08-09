import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor (private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; // cast as a number with the '+'
          // this is checked whenever the parameters change, this comes from 'subscribe'
          // if params has an id property...
          // if yes then this will be a string with the id
          // otherwise it will be undefined
          // so by comparing it to null and checking if it is not null, I'm checking, does it have the id?
          // params will only be not undefined if we are in 'edit mode', because then an id will be present
          // if this check returns 'true', so the id is undefined, therefor we are in 'new mode'
          this.editMode = params['id'] != null;
        }
      );
  }

}
