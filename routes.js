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
    
    app.post('/authAPI/signup', async (req, res, next)=> {
        try {
			const countEmailData = await knex
				.count("id").from("Users")
                .where({email: req.body.email});
            const countEmail = countEmailData[0]["count(`id`)"];
            if(countEmail == 0) {
                next();
            }else {
                res.send({
                    status: 'failure',
                    authMsg: 'Указанная почта уже существует'
                });
            }
		}catch(e) {
			console.log(e);
            res.status(401).send({
                status: 'error',
                authMsg: e.toSteing()
            });
		}
    });

    app.post('/authAPI/signup', async (req, res)=> {
        if (req.body.email && req.body.password) {
            const hashPassport = bcrypt.hashSync(req.body.password, 10);
            const currentDate = new Date();
            try {
                await knex('Users')
                    .insert({
                        email: req.body.email,
                        password: hashPassport,
                        createdAt: currentDate,
                        updatedAt: currentDate,
                        roleId: 1
                    });

                res.status(200).send({
                    status: 'success',
                    email: req.body.email,
                    roleId: 1
                })
            }catch (e) {
                console.log(e);
                res.send({
                    status: 'error',
                    authMsg: e.toSteing()
                });
            }

        } else {
            res.send({
                status: 'failure',
                authMsg: 'Ошибка введенных данных'
            });
        }
    });

    app.post('/authAPI/logInUser', async (req, res)=> {
        try {
            const match = await knex
                .select('id', 'password', 'roleId')
                .from('Users')
                .where({email: req.body.email});

            if (match.length === 0) {
                res.status(401).send({
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
                    res.status(401).send({
                        status: 'failure',
                        authMsg: 'Неверный пароль'
                    });
                }
            }
        }catch (e) {
            console.log(e);
            res.status(401).send({
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

    app.get('/authAPI/isAuthorized', (req, res) => {
        if(req.session.user.id > 0){
            res.send({
                status: 'success',
                email: req.body.email,
                roleId: req.session.user.roleId
            });
        }else {
            res.send({
                status: 'failure'
            });
        }
    });

    app.get('/main_page', checkLoginUser, (req, res, next)=>{
        next();
    });

    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/dist/index.html')
    });

};
