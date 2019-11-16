import React from 'react';
import PropTypes from 'prop-types';
import './paginator.scss';

const Paginator = (props) => {
    const {
      currentPage,
      pages,
      next,
      prev,
      eventHandler,
    } = props;

    return (
        <div className="paginator">
          { prev &&
            <button key={`prev-${prev}`} className="paginator__button" onClick={() => {eventHandler(prev)}}>Prev</button>
          }
          { getSurroundingPages(currentPage, pages, eventHandler) }
          { next &&
            <button key={`next-${next}`} className="paginator__button" onClick={() => {eventHandler(next)}}>Next</button>
          }
        </div>
    );
}

const getSurroundingPages = (currentPage, pages, eventHandler) => {
  const current = parseInt(currentPage ? currentPage : 1);

  const min = (current - 5) <= 0 ? 1 : (current - 5);
  const max = (current + 5) > pages ? pages : (current + 5);
  const buttons = [];

  for (let i = min; i <= max; i++) {
    buttons.push(
      <button key={`button-${i}`} className="paginator__button" onClick={() => {eventHandler(i)}}>
        {i}
      </button>
    );
  }

  return buttons;
}

Paginator.propTypes = {
    currentPage: PropTypes.number,
    pages: PropTypes.number,
    next: PropTypes.number,
    prev: PropTypes.number,
    eventHandler: PropTypes.func.isRequired,
}

Paginator.defaultProps = {
    currentPage: 1,
    pages: 0,
    next: undefined,
    prev: undefined,
}

export default Paginator;
