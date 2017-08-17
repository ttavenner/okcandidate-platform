'use strict';

const Controller = require('trails-controller');
const Boom = require('boom');
const words = require('./words.json');
const _ = require('lodash');
/**
 * @module ResultController
 * @description Candidate match results.
 */
module.exports = class SurveyResultController extends Controller {

    /**
     * Checks to see if a SurveyResult exists with a given
     * private passphrase, which is kept in a session.
     * If the session doesn't exist, or if no SurveyResults were found,
     * an empty object is returned.
     */
    get(request, reply) {
        const privatePassPhrase = request.yar.get('privatePassPhrase');

        if (!privatePassPhrase) {
            return reply({});
        }

        return this.app.orm.SurveyResult.find({
            where: {
                privatePassPhrase: privatePassPhrase
            },
            include: [{all: true}]
        })
            .then(response => {
                if (!response) {
                    return reply({});
                }
                return reply(response);
            })
            .catch(error => {
                reply(Boom.badRequest(error));
            });
    }

    /**
     * Creates a new SurveyResult record, and then saves the private pass phrase to a session.
     */
    create(request, reply) {
        const userData = request.payload || {};
        userData.publicPassPhrase = generatePhrase(3);
        userData.privatePassPhrase = generatePhrase(3);
        this.app.services.SurveyResultService
            .create(userData)
            .then(response => {
                request.yar.set('privatePassPhrase', response.toJSON().privatePassPhrase);
                reply(response);
            })
            .catch(error => {
                reply(Boom.badRequest(error));
            });
    }

    match(request, reply) {
        const params = request.params;

        this.app.services.SurveyResultService.match(params).then(response => {
            reply(response);
        });
    }

    electionReminder(request, reply) {
        const SurveyResultId = request.params.SurveyResultId;
        const email = request.payload.email;
        const phone = request.payload.phone;

        this.app.orm.SurveyResult.update({
            email,
            phone
        }, {
            where: {id: SurveyResultId}
        })
            .then(response => {
                reply(response[0]);
            })
            .catch(error => {
                reply(Boom.badRequest(error));
            });
    }
};

function generatePhrase(len) {
    return _.times(len, () => words[_.random(0, words.length - 1)])
        .join('-')
        .toLowerCase();
}
