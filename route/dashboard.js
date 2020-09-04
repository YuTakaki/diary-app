const express = require('express');
const route = express.Router();
const ensureAuthenticated = require('../setup/ensureAuthenticated');
const Diary = require('../model/diary');

route.use(express.json());
route.use(express.urlencoded({extended : true}));

route.get('/:id', ensureAuthenticated, (req, res) => {
    res.send(req.params.id);
});
route.get('/user/:id', (req, res) => {
    Diary.findById(req.params.id)
        .then(user => {
            user.diaries = user.diaries.sort((a, b) => b.date - a.date);
            res.send(user);
        });
});
route.post('/add-entry/:id', (req, res) => {
    const {title, diary} = req.body;
    // res.send(req.body);
    Diary.findById(req.params.id)
        .then(user => {
            user.diaries.push({title, diary});
            user.save()
                .then((user) => res.send(user))
        })
        .catch(err => console.log(err));
})
route.delete('/post', (req, res) => {
    const {user_id, diary_id} = req.query;

    Diary.findById(user_id)
        .then(user => {
            // console.log(user.diaries)
            const newDiaries = user.diaries.filter(diary => {
                console.log(diary._id)
                return diary_id !== diary._id.toString()});
            console.log(newDiaries)
            user.diaries = newDiaries;
                user.save()
                .then(updatedUser => res.send(updatedUser));
        })

})
module.exports = route;