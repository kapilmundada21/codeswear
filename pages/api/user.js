import User from "../../models/user"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let userById,userByid,userByName,userByEmail,userByCity,userByState;
        try {
            userById = await User.findOne({ _id: req.body.id })
        } catch (error) {
            
        }
        
        if (userById) {
            if (req.body.searchbyid) { 
                res.status(200).json({ sucess: true, user: userById })
                return
            }
            if (req.body.updatebyid) {
                let p = await User.findByIdAndUpdate({ _id: req.body.id }, {
                    name: req.body.name,
                    email: req.body.email,
                    address: req.body.address,
                    city: req.body.city,
                    phone: req.body.phone,
                    pincode: req.body.pincode,
                    state: req.body.state
                })
                await p.save()
                res.status(200).json({ sucess: true })
                return
            }
            if (req.body.deletebyid) {
                let p = await User.deleteOne({ _id: req.body.id })
                res.status(200).json({ sucess: true })
                return
            }
        }
        else{
            res.status(200).json({ sucess: false, error: 'User not found!' })
            return
        }
        // if(userByid || userByName || userByEmail || userByCity || userByState){
        //     if (req.body.search && userByid) { 
        //         res.status(200).json({ sucess: true, user: userByid })
        //         return
        //     }
        //     if (req.body.search && userByName) { 
        //         res.status(200).json({ sucess: true, user: userByName })
        //         return
        //     }
        //     if (req.body.search && userByEmail) { 
        //         res.status(200).json({ sucess: true, user: userByEmail })
        //         return
        //     }
        //     if (req.body.search && userByCity) { 
        //         res.status(200).json({ sucess: true, user: userByCity })
        //         return
        //     }
        //     if (req.body.search && userByState) { 
        //         res.status(200).json({ sucess: true, user: userByState })
        //         return
        //     }
        // }

    }
    else {
        res.status(200).json({ sucess: true, error: "This method is not allowed" })
        return
    }
}


export default connectDb(handler);