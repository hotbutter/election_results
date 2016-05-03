/* eslint-disable no-console */
import React from 'react';
import { render } from 'react-dom';

function parseJSON(response) {
  return response.json();
}

const App = React.createClass({
  getInitialState() {
    return {
      data: [],
    };
  },
  componentDidMount() {
    this.getPollResults();
    setInterval(() => this.getPollResults(), 1000);
  },
  getPollResults() {
    fetch('/api/results', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(parseJSON)
    .then((res) => (
      this.setState({ data: res.data })
    ));
  },
  render() {
    const demPollTotals = this.state.data.reduce((memo, el) => {
      if (el.party === 'dem') {
        return memo + el.votes;
      } else {
        return memo;
      }
    }, 0);
    const repPollTotals = this.state.data.reduce((memo, el) => {
      if (el.party === 'rep') {
        return memo + el.votes;
      } else {
        return memo;
      }
    }, 0);
    const demPollResults = this.state.data.reduce((memo, el) => {
      if (el.party === 'dem') {
        return memo.concat({
          ...el,
          votePercent: (el.votes / demPollTotals) * 100,
        });
      } else {
        return memo;
      }
    }, []);
    const repPollResults = this.state.data.reduce((memo, el) => {
      if (el.party === 'rep') {
        return memo.concat({
          ...el,
          votePercent: (el.votes / repPollTotals) * 100,
        });
      } else {
        return memo;
      }
    }, []);
    return (
      <div className='ui container'>
        <div className='ui two column doubling stackable grid'>
          <div className='column'>
            <div style={{ borderColor: '#007dd6', borderBottom: '3px solid #007dd6', padding: '0.4em 0' }}>
              <h4>Democrats</h4>
            </div>
            <PollResultTable results={demPollResults} />
          </div>
          <div className='column'>
            <div style={{ borderColor: '#b81800', borderBottom: '3px solid #b81800', padding: '0.4em 0' }}>
              <h4>Republicans</h4>
            </div>
            <PollResultTable results={repPollResults} />
          </div>
        </div>
      </div>
    );
  },
});

const transitionStyle = {
  transitionDuration: '600ms',
};

const PollResultTable = React.createClass({
  render() {
    return (
      <table className='ui very basic unstackable celled table'>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
            <th>Votes</th>
            <th>Delegates</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.results.map((r) => (
              <tr>
                <td>
                  <h4 className='ui header'>
                    <div className='content'>
                      {r.name}
                    </div>
                  </h4>
                </td>
                <td>
                  <div className={`ui tiny ${r.party === 'dem' ? 'blue' : 'red'} progress`}>
                    <div
                      className='bar'
                      style={{
                        ...transitionStyle,
                        width: `${r.votePercent}%`,
                      }}
                    >
                    </div>
                  </div>
                </td>
                <td>
                  <div className='content'>
                    {r.votes}
                  </div>
                </td>
                <td>
                  <div className='content'>
                    {r.delegates}
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  },
});

render(
  <App />,
  document.getElementById('content')
);
