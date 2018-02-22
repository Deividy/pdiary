import React, { Component } from 'react';
import '../styles/css/DiaryEntryList.css';

import moment from 'moment';

import { connect } from 'react-redux';
import projectDiary from '../projectDiary';

const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();


class DiaryEntryList extends Component {
  render () {
    return (
      <section className='diary-entry-list'>
        { this.props.diaryEntries.map((entry, idx) => (
          this._renderEntry(entry, idx === (this.props.diaryEntries.length - 1))
        )) }
      </section>
    );
  }

  _renderEntry (entry, isLast) {
    return (
      <div key={ entry.id }>
        <div className="section">
          { htmlToReactParser.parse(entry.body) }
          <p>{ moment(entry.note_date).format('LLLL') }</p>
        </div>
        { !isLast &&
          <div className="divider"></div> }
      </div>
    );
  }
}

projectDiary.addContainer('DiaryEntryList', connect((s) => {
  return { diaryEntries: s.diaryEntries };
})(DiaryEntryList));
