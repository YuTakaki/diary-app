const express = require('express');
const route = express.Router();
const ensureAuthenticated = require('../setup/ensureAuthenticated');
const Diary = require('../model/diary');
const bcrypt = require('bcrypt');

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
        })
        .catch(err => console.log(err));
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
    // console.log('update');
    const {user_id, diary_id} = req.query;
    const {title, diary} = req.body;
    // console.log(req.body)
    Diary.findOne({_id : user_id})
        .then(user => {
            updated_diaries = user.diaries.map(current_diary => {

                if(current_diary._id.toString() === diary_id){
                    current_diary.title = title;
                    current_diary.diary = diary;
                }
                // console.log('map')
                return current_diary;
            });
            user.diaries = updated_diaries;
            console.log(updated_diaries);
            user.save()
                .then(user => {
                    // console.log('save')
                    res.redirect(`/dashboard/user/${user_id}`)})
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

route.put('/update-account/:id', (req, res) => {
    const {_id, username, email, password, retry_password} = req.body;
    let err = {
        msg_username : '',
        msg_email : '',
        msg_password : '',
        msg_retry : ''
    };
    const checkUsername = /^[^\d][\w]{6,}/;
    
    if(!checkUsername.test(username)) err.msg_username = "not a valid username (should have atleast 6 characters and doesn't starts in number)";

    const check = /([\w.-\_]+)[@][\w]{2,}([.]?[\w]{2,})?([.][\w]{2,})?/;
                    if(!check.test(email)) err.msg_email = "not a valid email";
    Diary.findOne({username : username})
        .then((user) => {
            if(user && user._id.toString() !== _id) err.msg_username = 'Username already exist';
            Diary.findOne({email : email})
                .then((user) => {
                    
                    if(user && user._id.toString() !== _id) err.msg_email ='Email already exist';
                    if(password.length < 8) err.msg_password = 'password should have atleast 8 characters or more';
                    if(password !== retry_password) err.msg_retry = 'password is wrong';
                    if(Object.values(err).every(err => err === '') === false){
                        res.send(err);
                    }else{
                        bcrypt.genSalt(10, (err, salt)=>{
                            if (err) throw err;
                            bcrypt.hash(password, salt, (err, hash) => {
                                if(err) throw err;
                                Diary.findOneAndUpdate({_id : user._id},{username, email, password : hash})
                                    .then(() => Diary.findOne({_id})
                                                    .then(user => {
                                                        user.diaries = user.diaries.reverse()
                                                        res.send(user);
                                                    }));
                            });
                        });
                    };
                });
        });
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
        .catch(err => console.log(err));

})
module.exports = route;