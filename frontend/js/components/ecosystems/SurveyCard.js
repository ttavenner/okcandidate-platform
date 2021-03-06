'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from './../atoms/Icon';
import SentimentSelector from './../organisms/SentimentSelector';
import RadioButtons from './../organisms/RadioButtons';
import Alert from './../organisms/Alert';
import SurveyProgressBar from './../organisms/SurveyProgressBar';
import Card from './../atoms/Card';

import {
    setQuestionAnswerId
} from './../../redux/actions/survey-actions';

class SurveyCard extends Component {
    constructor(props) {
        super(props);
    }

    onRadioButtonChange(id) {
        this.props.dispatch(setQuestionAnswerId(id, this.props.id));
    }

    render() {
        const agreement = !this.props.multipleChoice && this.props.hasSentiment;
        const leftLabel = agreement ? 'Strongly\nDisagree' : 'Don\'t care';
        const rightLabel = agreement ? 'Strongly\nAgree' : 'Care a lot';

        return (
            <Card
                className="survey-card"
                actions={[
                    <button
                        key={1}
                        onClick={this.props.onBackClick}>
                        Back
                    </button>,
                    <button
                        key={2}
                        className="primary"
                        onClick={this.props.onNextClick}>
                        Next
                    </button>
                ]}>

                <SurveyProgressBar
                    value={this.props.answerCount}
                    max={this.props.questionCount}
                    minimum={1}
                    onClick={this.props.onResultsClick} />

                <Icon className="big">check_circle</Icon>
                <p className="question-text">{this.props.text}</p>

                <div className="survey-card-interface">

                    {
                        this.props.answerHelp &&
                        <Alert
                            level="warning"
                            message={this.props.answerHelp} />
                    }

                    {
                        this.props.multipleChoice &&
                        <RadioButtons
                            hideName
                            name="multiplechoice"
                            options={this.props.options}
                            selected={this.props.answerId}
                            labelKey="text"
                            onChange={this.onRadioButtonChange.bind(this)} />
                    }

                    {
                        this.props.sentimentHelp &&
                        <Alert
                            level="warning"
                            message={this.props.sentimentHelp} />
                    }

                    {
                        this.props.hasSentiment && !agreement &&
                        <label>How important is this to you?</label>
                    }

                    {
                        this.props.hasSentiment &&
                            <SentimentSelector
                                id={this.props.id}
                                sentiment={this.props.sentiment}
                                leftLabel={leftLabel}
                                rightLabel={rightLabel}
                                dispatch={this.props.dispatch} />
                    }
                </div>
            </Card>
        );
    }
}

SurveyCard.propTypes = {
    answerCount: PropTypes.number,
    questionCount: PropTypes.number,
    text: PropTypes.string,
    dispatch: PropTypes.func,
    id: PropTypes.number,
    sentiment: PropTypes.number,
    hasSentiment: PropTypes.bool,
    multipleChoice: PropTypes.bool,
    options: PropTypes.array,
    answerId: PropTypes.number,
    onBackClick: PropTypes.func,
    onNextClick: PropTypes.func,
    sentimentHelp: PropTypes.string,
    answerHelp: PropTypes.string,
    onResultsClick: PropTypes.func
};

module.exports = SurveyCard;
