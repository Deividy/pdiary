import React, { Component } from 'react';

import projectDiary from '../projectDiary';

const { AppHeaderLoggedIn, DiaryHeader } = projectDiary.containers;
const { DiaryEntryList } = projectDiary.containers;

class DiaryLoggedIn extends Component {
  render () {
    const { diaryLink } = this.props.match.params;

    return (
      <div>
        <AppHeaderLoggedIn />
        <section className='container'>
          <DiaryHeader diaryLink={ diaryLink } />
          <DiaryEntryList />
        </section>
      </div>
    );
  }

  // TODO DRY
  componentWillMount () {
    const { diaryLink } = this.props.match.params;
    this.loadDiaryEntries(diaryLink);
  }

  componentWillUpdate (nextProps, nextState) {
    const nextDiaryLink = nextProps.match.params.diaryLink;
    const currentDiaryLink = this.props.match.params.diaryLink;

    if (nextDiaryLink !== currentDiaryLink) {
      this.loadDiaryEntries(nextDiaryLink);
    }
  }

  async loadDiaryEntries (diaryLink) {
    await projectDiary.redux.diaryEntries.actions.load(diaryLink);
  }
}

projectDiary.addPage('DiaryLoggedIn', DiaryLoggedIn);
