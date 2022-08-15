import Order from "../../models/order"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        if (req.body.searchbyid) {
            let orderById;
            try {
                orderById = await Order.findOne({ _id: req.body.id })
            } catch (error) {
                
            }
            if(orderById){
                res.status(200).json({ sucess: true, order: orderById })
                return
            }
            else{
                res.status(200).json({ sucess: false, error: 'Order not found' })
                return
            }
        }
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