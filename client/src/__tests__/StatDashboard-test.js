import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App.jsx';
import StatDashboard from '../components/StatDashboard.jsx';
import { MemoryRouter } from 'react-router';

test('StatDashboard renders correctly', () => {
  const element = renderer.create(
    <MemoryRouter>
      <StatDashboard
        userGames={null}
        filteredUserGames={null}
        data={null}
        statLoading={false}
        getDashboardData={App.getDashboardData}
        getPieChartData={App.getPieChartData}
        pieChartData={null}
      />
    </MemoryRouter>
  );
  let tree = element.toJSON();
  expect(tree).toMatchSnapshot();
});