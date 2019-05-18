module.exports = function(app, knex){
    app.get('/courseAPI/loadCourses', async (req, res)=>{
        try {
            let data = null;
            if(req.query.isPublic === "true") {
                data = await knex
                    .select().from('Courses').where({isPublic: 1});
            }else {
                data = await knex
                    .select().from('Courses');
            }
            res.send({
                payload: data,
                status: "success"
            });
        }catch(e) {
            let errorMsg = e.ToString();
            console.error(errorMsg);
            res.send({
                status: "error",
                errorMsg
            });
        }
    });
    
    app.get('/courseAPI/lastCourseId', async(req, res)=>{
        try {
            let lastCourseId = await knex("Courses").max("id");
		    res.send(lastCourseId);
        } catch (error) {
            console.error(error.ToString());
            res.status(404).end();
        }
    });
    app.post('/courseAPI/saveCourseChange', async(req, res)=> {
        const {courseTitle, tableContents, courseId} = req.body;
        const currentDate = new Date();
        const noop = ()=> undefined;
        try{
            await knex("Courses")
                .where({id: courseId})
                .update(
                    {
                        title: courseTitle,
                        updatedAt: currentDate,
                        tableContents
                    }
                ).catch(noop) || await knex.insert([{
                    id: courseId,
                    title: courseTitle,
                    createdAt: currentDate,
                    updatedAt:currentDate,
                    authorId: req.session.user.id,
                    isPublic: 0,
                    tableContents
                }]).into("Courses");
            res.send({status: "success"})
        }catch(e) {
            res.send({
                status: "error",
                errorMsg: e.ToString()
            })
        }
    })
};
