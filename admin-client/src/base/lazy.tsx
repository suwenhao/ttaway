import React from 'react';

const asyncComponent = (importComponent: any) => {
  return class extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = {
        component: null
      }
    }
    componentDidMount() {
      importComponent()
        .then((cmp: any) => {
          this.setState({ component: cmp.default });
        });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }
};

export default asyncComponent;