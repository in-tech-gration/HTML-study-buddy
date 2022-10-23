import { Injectable } from '@angular/core';
import { allLevelGroups } from '../data/levels';
import {  CustomBlock } from "ngx-blockly";


@Injectable({
  providedIn: 'root'
})
export class StateService {
  public levelGroups = allLevelGroups;
  public levelName: string = "";
  public currentHTML = "";
  public goalHTML = "";
  public customBlocks: CustomBlock[] = [];
  public toolboxXML: string = "";
  public workspaceXML: string = "";


  constructor() {
    setTimeout(() => this.markCompletedLevels() , 300);
   }

  markLevelAsComplete() {
    let completedLevels = JSON.parse(localStorage.getItem("completed-levels") ?? '[]');
    if (!completedLevels.includes(this.levelName)) {
      completedLevels.push(this.levelName);
      localStorage.setItem('completed-levels', JSON.stringify(completedLevels));
    }
    this.markCompletedLevels();
  }

  markCompletedLevels() {
    let completedLevels = JSON.parse(localStorage.getItem("completed-levels") ?? '[]');
    let lvls = this.levelGroups.map(g => g.levels).reduce((prev, curr) => [...prev, ...curr] , []);
    lvls.forEach(l => l.completed = completedLevels.includes(l.name));
  }
}
