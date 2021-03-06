module.exports = (services, bcrypt) => {
    const user_controller = {
        getAll: async (req, res) => {
            let result = await services.user.getAll();
            res.send(result);
        },
        getById: async (req, res) => {
            const { id } = req.params;
            let result = await services.user.getById(id);
            res.send(result); ls
        },

        register: async (req, res) => {
            const { firstname, lastname, email, password } = req.body;

            try {
                if (!firstname || !lastname || !email || !password) {
                    res.status(400).json("missing parameters");
                } else {
                    const checkUser = await services.user.getUserByEmail(email);
                    if (checkUser) {
                        res.status(409).json("User already exists")
                    } else {
                    let hashedPassword = await bcrypt.hash(password, 10);
                    
                    let result = await services.user.register([firstname, lastname, email, hashedPassword]);
                    await services.user.getById(result.insertId);
                    // await services.mailer.sendMail(user);
                    res.status(201).json("new user registered");
                }
                }
                
            } catch (err) {
                res.status(400).json(err);
            }
        },
        login: async (req, res) => {
            const { email, password } = req.body;
            try {
                if (!email || !password) {
                    return res.status(400).json("missing parameters")
                };
                const userFound = await services.user.getUserByEmail(email);

            if (userFound) {
                const isIdentified = await bcrypt.compare(password, userFound.password);
                const { id, firstname } = userFound;

                await services.jwt.generateToken(res, id, firstname)

                if (isIdentified) {
                res.status(200).json({
                    user: {
                        id: userFound.id,
                        firstname: userFound.firstname,
                        lastname: userFound.lastname,
                    }
                });
                } else {
                    console.log('erreur login')
                }
            } else {
                console.log('erreur login noUserFound')
            }
        
        } catch (err) {
            res.status(400).json(err);
        }
    }
    };

    return user_controller;
};