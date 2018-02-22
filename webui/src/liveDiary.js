import io from 'socket.io-client';
import projectDiary from './projectDiary';

// TODO MUST this is HARD code and is ugly as hell :p we'll fix it!
const baseSocketUrl = /deividy\.com/.test(window.location.href) ?
                                          'https://pdiary-live.deividy.com' :
                                          'http://localhost:9001';
class LiveDiary {
  constructor () {
    this.socket = null;
  }

  listen (diaryLink) {
    if (this.socket) this.socket.disconnect();

    this.socket = io.connect(`${baseSocketUrl}?diaryLink=${diaryLink}`, {
      transports: ['websocket', 'polling']
    });

    // all data we get is only diaryEntry for now :x
    this.socket.on('data', (msg) => {
      const diaryEntry = JSON.parse(msg.toString());

      projectDiary.redux.diaryEntries.actions.socketAddEntry(diaryEntry);

    });
  }
}

export default function () { return new LiveDiary(); }
