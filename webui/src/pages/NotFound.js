import React, { Component } from 'react';
import projectDiary from '../projectDiary';

class NotFound extends Component {
  render () {
    return (
      <section className="container main-content">
        <div className="section">
          <div className="row">
            <p className="flow-text center">
              404 - Not found route! { this.props.location.pathname }
            </p>
          </div>
        </div>
      </section>
    );
  }
}

projectDiary.addPage('NotFound', NotFound);
