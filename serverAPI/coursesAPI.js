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
};
