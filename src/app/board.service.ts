import { Injectable } from '@angular/core';
import { Board } from './shared/models/schema.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  // private _boards: Board[] = require('./data.json');
  private _boards: Board[] =JSON.parse(localStorage.getItem("data") || "[]");

  getBoards(): Board[] {
    console.log(this._boards)
    return this._boards;
  }
}
