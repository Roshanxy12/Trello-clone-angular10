import { Component } from '@angular/core';
import { BoardService } from './board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditTalkComponent } from './edit-talk/edit-talk.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTalkComponent } from './delete-talk/delete-talk.component';
import { Board, Talk, Track } from './shared/models/schema.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  boards: Board[] = [];
  boarddata=
  [
    {
      "title": "Day one",
      "tracks": [
        {
          "id": "track-one",
          "title": "Track one",
          "talks": [
            {
              "issueType": "epic",
              "text": "Keynote addess",
              
  
              "desc": "Igor Minar",
              "createdAt": "2018-01-01T09:26:05.026Z"          },
          
            
         
          
           
          ]
        },
        {
          "id": "track-two",
          "title": "Track two",
          "talks": [
            {
              "issueType": "epic",
              "text": "Keynote addess",
              
  
              "desc": "Igor Minar",
              "createdAt": "2018-01-01T09:26:05.026Z"          },
            {
              "issueType": "bug",
              "text": "VS Code Can Do That",
              "speaker": "John Papa",
              "createdAt": "2020-02-01T09:26:05.026Z",
              "desc": "Igor Minar",

           
            },
            {
              "issueType": "sub-task",
              "text": "How to save time & money by planning your ngUpgrade",
              "speaker": "Sam Julien",
              "desc": "Igor Minar",
  
              "createdAt": "2019-03-01T09:26:05.026Z"
            },
            {
              "issueType": "task",
              "text": "How to AI in JS?",
              "desc": "Igor Minar",
  
              "speaker": "Asim Hussain",
              "createdAt": "2020-04-01T09:26:05.026Z",
              "tags": [
                {
                  "name": "Intro",
                  "color": "#e0e0e0"
                }
              ]
            },
            {
              "issueType": "story",
              "text": "You Might Not Need NgRx",
              "desc": "Igor Minar",
  
              "speaker": "Michael Ryan",
              "createdAt": "2020-05-01T09:26:05.026Z"
            },
            {
              "issueType": "story",
              "text": "Upgrading to Angular without ngUpgrade",
              "speaker": "Erin Coughlan",
              "desc": "Igor Minar",
  
              "createdAt": "2020-06-01T09:26:05.026Z"
            },
            {
              "issueType": "task",
              "text": "Why you need a build system, and why it should be Bazel",
              "speaker": "Martin Probst",
              "desc": "Igor Minar",
  
              "createdAt": "2020-07-01T09:26:05.026Z"
            },
            {
              "issueType": "task",
              "desc": "Igor Minar",
  
              "text": "The theory of Angular Ivy",
              "speaker": "Alex Rickabaugh",
              "createdAt": "2020-08-01T09:26:05.026Z"
            },
            {
              "issueType": "task",
              "text": "Building an Angular PWA: Angular Service Worker or Workbox?",
              "speaker": "Maxim Salnikov",
              "createdAt": "2020-09-01T09:26:05.026Z",
              "desc": "Igor Minar",
  
              "tags": [
                {
                  "name": "Deep-dive",
                  "color": "#e0e0e0"
                }
              ]
            },
            {
              "issueType": "task",
              "text": "Angular Unit Testing - how to win friends, design better code, and get rich quick!",
              "speaker": "Shai Reznik",
              "desc": "Igor Minar",
  
              "createdAt": "2020-10-01T09:26:05.026Z"
            }
          ]
        }
      
      ]
    }
  ]
  constructor(private _boardService: BoardService, private _dialog: MatDialog) {
    localStorage.setItem('data',JSON.stringify(this.boarddata))
    setTimeout( ()=>{
      this.boards = this._boardService.getBoards();
    }, 1000)
  }

  /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
   */
  trackIds(boardIndex): string[] {
    return this.boards[boardIndex].tracks.map(track => track.id);
  }

  onTalkDrop(event: CdkDragDrop<Talk[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given talk to the target data array. This happens if
    // a talk has been dropped on a different track.
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onTrackDrop(event: CdkDragDrop<Track[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  addEditTalk(talk: Talk, track: Track, edit = false) {
    // Use the injected dialog service to launch the previously created edit-talk
    // component. Once the dialog closes, we assign the updated talk data to
    // the specified talk.
    this._dialog.open(EditTalkComponent, {data: {talk, edit}, width: '500px'})
      .afterClosed()
      .subscribe(newTalkData => edit ? Object.assign(talk, newTalkData) :      track.talks.unshift(newTalkData) 
      
         );
    console.log(track,'#@@@@@@@@@@@@@@@@')
    console.log(this.boarddata)
  }

  deleteTalk(talk: Talk, track: Track) {
    // Open a dialog
    this._dialog.open(DeleteTalkComponent, {data: talk, width: '500px'})
      .afterClosed()
      .subscribe(response => {
        // Wait for it to close and delete the talk if the user agreed.
        if (response) {
          track.talks.splice(track.talks.indexOf(talk), 1);
        }
      });
  }

  filterByDate(talks, asc = 1) {
    talks = [...talks.sort((a: any, b: any) => (asc) * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))];
    console.log(talks);
  }
}
