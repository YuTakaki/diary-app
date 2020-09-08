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
    Diary.findOne({_id : req.params.id })
        .then(user => {
            user.diaries = user.diaries.reverse()
            res.send(user);
        });
});
route.post('/add-entry/:id', (req, res) => {
    const {title, diary} = req.body;
    // res.send(req.body);
    Diary.findOne({_id : req.params.id})
        .then(user => {
            user.diaries.push({title, diary});
            user.save()
                .then((user) => res.redirect(`/dashboard/user/${req.params.id}`));
        })
        .catch(err => console.log(err));
});
route.post('/update-entry/', (req, res) => {
    const {user_id, diary_id} = req.query;
    const {title, diary} = req.body;
    // res.send(req.body);
    Diary.findOne({_id : user_id})
        .then(user => {
            user.diaries = user.diaries.map(diary => {
                if(diary_id === diary_id){
                    diary.title = title;
                    diary.diary = diary;
                }
                return diary;
            });
            user.save()
                .then(user => res.redirect(`/dashboard/user/${user_id}`))
        })
        .catch(err => console.log(err));
});
route.get('/postcontent/user/', (req, res) => {
    const {user_id, diary_id} = req.query;
    console.log(req.query);
    Diary.findOne({_id: user_id})
        .then(user => {
            let post = user.diaries.filter(diary => diary._id.toString() === diary_id);
            post = post[0];
            res.send(post);
        })
        .catch(err => console.log(err));


});
route.get('/filter/:id/', (req, res) => {
    const condition = Object.keys(req.query);
    // console.log(req.query['month']);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    Diary.findOne({_id:req.params.id})
        .then(user => {
            condition.forEach(filter => {
                console.log(filter);
                if(filter === 'month'){
                    user.diaries = user.diaries.filter(diary => new Date(diary.date).getMonth() === month.indexOf(req.query[filter]))
                }
                if(filter === 'year')
                    user.diaries = user.diaries.filter(diary => new Date(diary.date).getFullYear() === req.query[filter])  
                if(filter === 'date')
                    user.diaries = user.diaries.filter(diary => new Date(diary.date).getDate() === Number(req.query[filter]))
            });
            console.log(condition)
            if(condition.length === 0){
                res.send([])
            }else{
                res.send(user.diaries.reverse());
            }
        })
        .catch(err => console.log(err));

})
route.delete('/post/delete/', (req, res) => {
    const {user_id, diary_id} = req.query;

    Diary.findOne({_id : user_id})
        .then(user => {
                const newDiaries = user.diaries.filter(diary => {
                console.log(diary._id)
                return diary_id !== diary._id.toString()});
            user.diaries = newDiaries;
                user.save()
                .then((user) =>{ 
                    console.log(user);
                    user.diaries = user.diaries.reverse()
                    res.send(user)})
                    
                .catch(err => console.log(err));
        })

})
module.exports = route;