import React, { Component } from "react";

import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount() {
      this.reqIntercepter = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resIntercepter = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      console.log(
        "[withErrorHandler] WillUnmonut",
        this.reqIntercepter,
        this.resIntercepter
      );
      axios.interceptors.request.eject(this.reqIntercepter);
      axios.interceptors.response.eject(this.resIntercepter);
    }

    errorConfirmHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
