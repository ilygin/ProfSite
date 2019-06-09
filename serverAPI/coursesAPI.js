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
            let errorMsg = e.toString();
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
            console.error(error.toString());
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
                errorMsg: e.toString()
            })
        }
    })

    app.get("/courseAPI/loadTableContents", async(req, res)=> {
        try {
            let courseTableContentsQuery = await knex
                .select("tableContents", "title", "authorId")
                .from("Courses")
                .where({id: req.query.id})
            res.send({
                status: "success",
                payload: courseTableContentsQuery,
                isUserAuthor: req.session.user && courseTableContentsQuery[0].authorId == req.session.user.id
            })
        } catch (error) {
            res.send({
                status: "error",
                errorMsg: error.toString()
            })
        }
    })

    app.post("/courseAPI/savePage/", async(req, res) => {
        const noop = ()=> undefined;
        try {
            await knex("CoursesPages")
                .where({                        
                    courseId: req.body.courseId,
                    pageNumber: req.body.pageNumber
                })
                .update(
                    {
                        content: req.body.payload
                    }
                ).catch(noop) || await knex('CoursesPages')
                .insert({
                    courseId: req.body.courseId,
                    pageNumber: req.body.pageNumber,
                    content: req.body.payload
                });

            res.status(200).send({
                status: 'success',
            })
        } catch (error) {
            res.send({
                status: 'error',
                errorMsg: error.toString()
            })
        }
    })

    app.get("/courseAPI/loadPage/:courseId/:pageNumber", async(req, res)=>{
        
        try {
            const data = await knex
                .select("content")
                .from("CoursesPages")
                .where({
                    courseId: req.params.courseId,
                    pageNumber: req.params.pageNumber,
                })
            res.status(200).send({
                status: 'success',
                payload: data[0].content
            })
        } catch (error) {
            res.redirect("/main_page");
        }
    })
};
