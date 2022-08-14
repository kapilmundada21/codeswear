import Admin from "../../models/admin"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        if(req.body.adminExist){
            let existadmin = await Admin.findOne({ email: req.body.email })
            if(existadmin){
                res.status(200).json({ sucess: true })
                return
            }
            else{
                res.status(200).json({ sucess: false })
                return
            }
        }

        let adminById;
        try {
            adminById = await Admin.findOne({ _id: req.body.id })
        } catch (error) {

        }

        if (adminById) {
            if (req.body.searchbyid) {
                res.status(200).json({ sucess: true, admin: adminById })
                return
            }
            if (req.body.updatebyid) {
                let p = await Admin.findByIdAndUpdate({ _id: req.body.id }, {
                    name: req.body.name,
                    email: req.body.email
                })
                await p.save()
                res.status(200).json({ sucess: true })
                return
            }
            if (req.body.deletebyid) {
                let p = await Admin.deleteOne({ _id: req.body.id })
                res.status(200).json({ sucess: true })
                return
            }
        }
        else {
            res.status(200).json({ sucess: false, error: 'Admin not found!' })
            return
        }
    }
    else {
        res.status(200).json({ sucess: true, error: "This method is not allowed" })
        return
    }
}


export default connectDb(handler);