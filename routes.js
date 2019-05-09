const bcrypt = require('bcryptjs');

module.exports = function(app, knex, session){
    app.use(session({
        secret: 'my test session',
        resave: true,
        saveUninitialized: false
    }));

    app.post('/authAPI/checkEmail', async (req, res)=> {
        const data = await knex
            .count('id').from('Users').where({email: req.body.email});
        res.send(data);
    });

    function checkLoginUser(req, res, next) {
        if (req.session.user) {
            next();
        }else {
            res.redirect('/');
        }
    }

    // app.post('/auth/signup', async (req, res)=> {
    //     if (req.body.email && req.body.password) {
    //         const hashPassport = bcrypt.hashSync(req.body.password, 10);
    //         const currentDate = new Date().toUTCString();
    //         try {
    //             await knex('Users')
    //                 .insert({email: req.body.email, password: hashPassport, createdAt: currentDate, updatedAt: currentDate});

    //             res.send({status: 'success'});
    //         }catch (e) {
    //             res.send({status: 'error', authMsg: e});
    //         }

    //     } else {
    //         res.send({status: 'error', authMsg: 'Ошибка введенных данных'});
    //     }
    // });

    app.post('/authAPI/logInUser', async (req, res)=> {
        try {
            const match = await knex
                                .select('id', 'password', 'roleId')
                                .from('Users')
                                .where({email: req.body.email});

            if (match.length === 0) {
                res.status(401).json({
                    status: 'failure',
                    authMsg: 'Неверная почта'
                });
            } else {
                const isAccessAllowed = bcrypt.compareSync(req.body.password, match[0].password);

                if (isAccessAllowed) {
                    req.session.user = match[0];
                    res.status(200).send({
                        status: 'success',
                        email: req.body.email,
                        roleId: match[0].roleId
                    });
                } else {
                    res.status(401).json({
                        status: 'failure',
                        authMsg: 'Неверный пароль'
                    });
                }
            }
        }catch (e) {
            console.log(e);
            res.status(401).json({
                status: 'error',
                authMsg: 'Сервис не доступен.'
            });
        }
    });

    app.get('/authAPI/logout', (req, res) => {
        req.session.destroy(()=>{
            res.redirect('/');
        })
    });

    // app.get('/auth/isAuthorized', (req, res) => {
    //     if(req.session.user.length > 0){
    //         res.json({
    //             isAuthorized:true,
    //             status: 'success',
    //             email: req.body.email,
    //             roleId: match[0].roleId
    //         });
    //     }else {
    //         res.json({isAuthorized: false});
    //     }
    // });

    app.get('/account', checkLoginUser, (req, res, next)=>{
        next();
    });

    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/dist/index.html')
    });

};
