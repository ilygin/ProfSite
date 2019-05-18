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
        const {courseTitle, units, sections, courseId} = req.body;
        //Проверяется наличие курса в таблице Courses
        // let checkExistenceCourse = await knex
        //     .count("id")
        //     .from("Courses")
        //     .where({id: courseId})
        // let isNewCourse = checkExistenceCourse[0][`count(id)`] > 0;

        // if(isNewCourse) {
            
        // }else {
        //     await knex('Courses')
        //     .where({id: courseId})
        //     .update({
        //         updatedAt: currentDate,
        //         updatedBy: req.session.user.id,
        //         title: courseTitle
        //     });
        // }
        const currentUTCDate = new Date();
        const noop = ()=> undefined;
        // const saveTitlePageQuery = await knex("Courses")
        //     .where({id: courseId})
        //     .update(
        //         {
        //             title: courseTitle,
        //             updatedAt: currentUTCDate 
        //         }
        //     ).catch(noop) || await knex.insert([{
        //         id: courseId,
        //         title: courseTitle,
        //         createdAt: currentUTCDate,
        //         updatedAt:currentUTCDate,
        //         authorId: 1,
        //         isPublic: 0
        //     },
        //     {
        //         id: courseId+1,
        //         title: courseTitle,
        //         createdAt: currentUTCDate,
        //         updatedAt:currentUTCDate,
        //         authorId: 1,
        //         isPublic: 0
        //     }]).into("Courses")
        knex.raw('INSERT INTO Courses (id,title,roleId) values (?,?,?),(?,?,?),(?,?,?)'+
                    ' ON DUPLICATE KEY'+
                    ' UPDATE title=qwe, roleId=0', [[1, 2, 0],[3, 23, 0],[8, 2, 0]]);
            console.log(saveTitlePageQuery);
    })
};
