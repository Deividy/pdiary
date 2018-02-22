import React, { Component } from 'react';
import projectDiary from '../projectDiary';

const { AppHeaderNotLoggedIn } = projectDiary.components;
const { DiaryEntryList } = projectDiary.containers;

class DiaryNotLoggedIn extends Component {
  render () {
    return (
      <div>
        <AppHeaderNotLoggedIn />
        <section className='container'>
          <DiaryEntryList />
        </section>
      </div>
    );
  }

  // TODO dry
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

projectDiary.addPage('DiaryNotLoggedIn', DiaryNotLoggedIn);
