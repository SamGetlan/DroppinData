import React from 'react';
import Loadable from 'react-loadable';
import UserForm from './UserForm.jsx';


const LoadableComponent = Loadable({
  loader: () => import('./Stats.jsx'),
  loading: UserForm,
});

export default class LoadableStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoadableComponent
        {...this.props}
      />
    );
  }
}