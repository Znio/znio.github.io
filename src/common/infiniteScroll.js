import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import 'intersection-observer';

class InfiniteScroll extends Component {

    constructor(props){
        super(props);
        this.rootElement = React.createRef();
        this.lastRef = React.createRef();
    }

    componentDidMount() {
        this.initalizeScrollObserver();
    }

    initalizeScrollObserver() {
        const { scrollHandler } = this.props;
        // const rootElem = this.rootElement.current;
        if (!this.lastRef.current || !scrollHandler) return;

        let options = {
            root: null, //observing element
            threshold: 1, //when to trigger
            rootMargin: "0px" // margin for the observer
        }

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrollHandler();
                }
            });
        }, options);

        observer.observe(this.lastRef.current);
    }

    render() {
        return (
            <div ref={this.rootElement} className="infinite-holder">
                {this.props.children}
                <div ref={this.lastRef}></div>
            </div>
        );
    }
}

InfiniteScroll.propTypes = {
    scrollHandler: PropTypes.func.isRequired
}

export default InfiniteScroll;