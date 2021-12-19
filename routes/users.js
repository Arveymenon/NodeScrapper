const { GetUser, AddUsers } = require("../controller/users");

function UserRouter(router){

    router.get('/user/:id', GetUser);
    router.post('/user/add', AddUsers);

}

module.exports = UserRouter;