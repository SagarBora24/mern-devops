const express = require('express')
const router = express.Router()
const User = require('../Schema/User')
const bcrypt = require('bcrypt');
const fetchUser = require('../Middleware/middleware')
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const JwtSecret = 'Sagarisagoodboy'

const { checkSchema, validationResult } = require('express-validator');


router.use(express.json()) 
router.post('/create-user', 
    checkSchema({
        name: {notEmpty: {
            errorMessage:"Please Enter a name"
        }}, 
        email: {isEmail: {
            errorMessage: 'Must be a valid e-mail address',
          }
        },
        mobile_number:{in:'body', idLength: {max:10,min:10}},
        password: { isLength: { options: { min: 8 } },
        errorMessage: 'Password must be at least 8 chars long' },
      })
    
    ,async (req, res) => {
      
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json({ message: 'User with this email already exists. Please use another email.' });
        }
  
        // **Step 2: Hash the password**
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let user = new User({
        name:req.body.name,
        email: req.body.email,
        mobile_number:req.body.mobile_number,
        password: hashedPassword 
    })
      let savedUser =  await user.save()
      const token = jwt.sign({ userId: savedUser._id }, JwtSecret, { expiresIn: '1h' });

      res.json({data:{token}});
       console.log(savedUser)
})

router.post('/login', fetchUser,
    checkSchema({
      
        email: {isEmail: {
            errorMessage: 'Must be a valid e-mail address',
          },
          notEmpty:{
            errorMessage: 'Must not be empty',
          }
        },
        password: { isLength: { options: { min: 8 } },
        errorMessage: 'Password must be at least 8 chars long' },
      })
        ,async (req, res) => {
           
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
         const user = await User.findOne({email:req.body.email} )
         if(!user){
            return res.status(400).json({message:'Invalid email or password'})
         }
         const isMatch = await bcrypt.compare(req.body.password, user.password);

         if (!isMatch) {  // If passwords don't match
             return res.status(400).json({ message: 'Invalid email or password' });
         }
            res.json({message:'Login successful'})

})
    
module.exports = router