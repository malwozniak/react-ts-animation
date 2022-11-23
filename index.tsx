import React, { Component } from 'react';
import { render } from 'react-dom';

import AnimationList from './src/components/AnimationList';
import Modal from './src/components/Modal';
import AnimationCard from './src/components/AnimationCard';

import './sass/style.css';

interface AppProps {}
interface AppState {
  modalVisible: boolean;
  modalContent: any;
  randomAnimation: object;
  scrollable: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modalContent: '',
      randomAnimation: {},
      scrollable: true,
    };

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  apiBasePath = 'https://https://react-ts-uimc6b.stackblitz.io/;

  async fetchRandomAnimation() {
    const apiCall = await fetch(
      this.apiBasePath + 'animation/' + this.generateRandomInteger(1, 10)
    );
    const data = await apiCall.json();

    console.log(data);

    this.setState((state, props) => {
      return {
        modalContent: <AnimationCard animation={data} />,
        modalVisible: true,
        scrollable: false,
      };
    });
  }

  generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  componentDidMount() {
    this.fetchRandomAnimation();
  }

  handleItemClick(item: any) {
    this.setState((state, props) => {
      return {
        modalContent: <AnimationCard animation={item} />,
        modalVisible: true,
        scrollable: false,
      };
    });
  }

  handleModalClose() {
    this.setState((state, props) => {
      return {
        modalContent: '',
        modalVisible: false,
        scrollable: true,
      };
    });
  }

  render() {
    return (
      <div>
        {this.state.modalVisible && (
          <Modal
            content={this.state.modalContent}
            onModalClose={this.handleModalClose}
          />
        )}
        <AnimationList
          onItemClick={this.handleItemClick}
          scrollable={this.state.scrollable}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
