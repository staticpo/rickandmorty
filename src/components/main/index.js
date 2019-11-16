import React from 'react';
import Profile from '../profile';
import Paginator from '../paginator';
import parser from '../../services/parser';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.switchPage = this.switchPage.bind(this);
    this.updateState = this.updateState.bind(this);

    this.state = {
      pages: {},
      profiles: [],
      currentPage: parseInt(1),
    }
  }

  /**
   * Switch to a specific results page
   * @param {number} page
   */
  switchPage(page) {
    parser(page, this.updateState);
  }

  componentDidMount() {
    this.switchPage(this.state.currentPage);
  }

  updateState(result) {
    const { profiles, pages } = result;
    this.setState({
      pages,
      profiles,
    });
  }

  render() {
    return (
      <div>
        <section className="info">
          { this.state.profiles.map((profile) => {
              return <Profile key={profile.id} {...profile} />;
          })}
        </section>
        <Paginator {...this.state.pages} eventHandler={this.switchPage} />
      </div>
    );
  }

};

export default Main;
