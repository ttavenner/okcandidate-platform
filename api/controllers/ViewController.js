'use strict';

const Controller = require('trails-controller');
const Boom = require('boom');

const {
    getClientRender,
    getAdminRender
} = require('./utils/getInitialRender');

module.exports = class ViewController extends Controller {

    home(request, reply) {
        getClientRender(request, function(error, html) {
            if (error) {
                // handle error.
            }
            reply(html);
        });
    }

    survey(request, reply) {
        const id = request.params.id;
        this.app.orm.Survey.find({
            where: {id}
        })
            .then(survey => {
                const id = survey.id;
                // If this survey uses the category sort page
                if (survey.categorySort) {
                    return reply.redirect(`/survey/${id}/category`);
                }
                // Otherwise, go directly to the questions.
                return reply.redirect(`/survey/${id}/questions`);
            });
    }

    start(request, reply) {
        this.app.orm.Survey.findAll({})
            .then((surveys) => {
                if (surveys.length === 1) {
                    return reply.redirect(`/survey/${surveys[0].id}?newSurvey=true`);
                }
                // Are any surveys region limited?
                // If so, set regionLimit to true and show LocationForm component.
                // Otherwise, show all the surveys.
                const regionLimit = surveys.some(survey => survey.regionLimit);
                return reply.redirect(`/survey?regionLimit=${regionLimit}`);
            })
            .catch((error) => {
                reply(Boom.badRequest(error.message));
            });
    }

    questions(request, reply) {
        getClientRender(request, function(error, html) {
            if (error) {
                // handle error
            }
            reply(html);
        });
    }

    surveyList(request, reply) {
        getClientRender(request, function(error, html) {
            if (error) {
                // handle error
            }
            reply(html);
        });
    }

    category(request, reply) {
        getClientRender(request, function(error, html) {
            if (error) {
                // handle error
            }
            reply(html);
        });
    }

    admin(request, reply) {
        getAdminRender(request, function(error, html) {
            if (error) {
                // handle error.
            }
            reply(html);
        });
    }

    login(request, reply) {
        reply.view('Login');
    }

    results(request, reply) {
        getClientRender(request, function(error, html) {
            if (error) {
                // handle error.
            }
            reply(html);
        });
    }

};
