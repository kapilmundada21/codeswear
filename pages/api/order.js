import Order from "../../models/order"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const { email,products,address,amount,status } = req.body
        let u = await new Order({email,products,address,amount,status })
        await u.save()
        res.status(200).json({ success: true })
        return
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
        return
    }
}
export default connectDb(handler);