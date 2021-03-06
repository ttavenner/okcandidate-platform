'use strict';

const surveys = [
    {
        id: 1,
        name: 'Multiple choice survey',
        QuestionTypeId: 1,
        SurveyStatusId: 1,
        categorySort: true
    },
    {
        id: 2,
        name: 'Multiple choice survey with intensity',
        QuestionTypeId: 2,
        SurveyStatusId: 3,
        regionLimit: true
    },
    {
        id: 3,
        name: 'Intensity only survey',
        QuestionTypeId: 3,
        SurveyStatusId: 3,
        regionLimit: true
    }
];

module.exports = {

    load: (app) => {
        return app.orm.Survey.count({})
        .then(count => {
            if (count > 0) {
                return [];
            }

            const maxId = Math.max.apply(Math,surveys.map(o => o.id));
            app.orm.Survey.sequelize.query(`select setval('survey_id_seq', ${maxId})`);

            // Create surveys.
            return Promise.all(
              surveys.map(survey => {
                  return app.orm.Survey.create(survey);
              })
            );
        })
        .then(newSurveys => {
            app.log.info('Surveys created.');
            return newSurveys;
        });
    }

};
