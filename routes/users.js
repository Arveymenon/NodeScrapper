const { GetAll, AddUsers} = require("../controller/users");

function UserRouter(router){

    router.post('/user/add', AddUsers);
    router.get('/users/all', GetAll);

}

module.exports = UserRouter;