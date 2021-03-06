import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Icon extends Component {

    render () {
        return (
            <i
                className={`icon material-icons ${this.props.className || '' }`}>
                {this.props.children}
            </i>
        );
    }

}

Icon.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};

export default Icon;
